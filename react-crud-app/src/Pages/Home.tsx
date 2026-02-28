import { useState, useEffect } from 'react';
import type { User } from '../Interfaces/User';
import UserForm from '../Components/UserForm';
import UserList from '../Components/UserList';

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const localData = localStorage.getItem('users');
    if (localData) {
      setUsers(JSON.parse(localData));
    } else {
      fetchAPI();
    }
  }, []);

  const fetchAPI = async () => {
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 800));

      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await res.json();

      const turkishNames = ["Ahmet Yılmaz", "Ayşe Demir", "Mehmet Kaya", "Fatma Çelik", "Ali Vatan"];
      const turkishPhones = ["0532 111 2233", "0555 222 3344", "0542 333 4455", "0533 444 5566", "0505 555 6677"];
      const turkishCompanies = ["Yılmaz Teknoloji", "Demir Holding", "Kaya Yazılım", "Çelik Lojistik", "Vatan A.Ş."];

      const formattedData = data.slice(0, 5).map((u: any, index: number) => ({
        id: u.id,
        name: turkishNames[index],
        email: `${turkishNames[index].split(' ')[0].toLowerCase()}@ornek.com`,
        phone: turkishPhones[index],
        companyName: turkishCompanies[index],
        isLocal: false
      }));

      setUsers(formattedData);
      localStorage.setItem('users', JSON.stringify(formattedData));
    } catch (error) {
      console.error("API Hatası", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    localStorage.removeItem('users');
    fetchAPI();
  };

  const handleAdd = (newUser: User) => {
    const updatedUsers = [newUser, ...users];
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const handleUpdate = (updatedUser: User) => {
    const updatedUsers = users.map(u => (u.id === updatedUser.id ? updatedUser : u));
    setUsers(updatedUsers);
    setEditingUser(null);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const handleDelete = (id: string | number) => {
    const updatedUsers = users.filter(u => u.id !== id);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const apiCount = users.filter(u => !u.isLocal).length;
  const localCount = users.filter(u => u.isLocal).length;

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8">
      
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-10 text-center shadow-2xl shadow-slate-200/50 border border-slate-700/50 mb-10 mt-2 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-3/4 bg-emerald-500/20 blur-[80px] rounded-full pointer-events-none"></div>
        <h1 className="relative z-10 text-4xl md:text-5xl font-black tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300">
          Kullanıcı Yönetim Paneli
        </h1>
        <p className="relative z-10 text-emerald-400 font-medium tracking-wide">
          React & Tailwind CSS ile Geliştirilmiş Modern CRUD Uygulaması
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center hover:shadow-md transition-shadow">
          <span className="text-4xl font-black text-slate-800">{users.length}</span>
          <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider mt-1">Toplam Kullanıcı</span>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center hover:shadow-md transition-shadow">
          <span className="text-4xl font-black text-sky-600">{apiCount}</span>
          <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider mt-1">API'den Çekilen</span>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center hover:shadow-md transition-shadow">
          <span className="text-4xl font-black text-emerald-600">{localCount}</span>
          <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider mt-1">Lokal Eklenen</span>
        </div>
      </div>

      <div className="flex justify-end mb-8">
        <button 
          onClick={handleReset} 
          disabled={isLoading}
          className={`font-medium px-5 py-2.5 rounded-xl transition-all text-sm flex items-center gap-2 shadow-sm ${
            isLoading 
              ? 'bg-emerald-50 text-emerald-600 cursor-not-allowed border border-emerald-200' 
              : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
          }`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-emerald-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Veriler Çekiliyor...
            </>
          ) : (
            'Verileri Sıfırla (API\'den Yenile)'
          )}
        </button>
      </div>

      <UserForm onAdd={handleAdd} onUpdate={handleUpdate} editingUser={editingUser} />

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-slate-100 shadow-sm mt-4">
          <div className="relative flex justify-center items-center">
            <div className="w-14 h-14 rounded-full absolute border-4 border-solid border-slate-100"></div>
            <div className="w-14 h-14 rounded-full animate-spin absolute border-4 border-solid border-emerald-500 border-t-transparent"></div>
          </div>
          <p className="mt-10 text-slate-500 font-medium animate-pulse">Kullanıcı verileri yenileniyor, lütfen bekleyin...</p>
        </div>
      ) : (
        <UserList users={users} onDelete={handleDelete} onEdit={setEditingUser} />
      )}
      
    </div>
  );
}