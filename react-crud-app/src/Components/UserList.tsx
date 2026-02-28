import type { User } from '../Interfaces/User';

interface Props {
  users: User[];
  onDelete: (id: string | number) => void;
  onEdit: (user: User) => void;
}

export default function UserList({ users, onDelete, onEdit }: Props) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-sky-600">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.25 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
        </svg>
        Sistemdeki Kullanıcılar
      </h2>
      
      {users.length === 0 ? (
        <div className="bg-slate-50 p-8 text-center rounded-2xl border border-dashed border-slate-300">
          <p className="text-slate-500">Henüz kayıtlı bir kullanıcı bulunmuyor.</p>
        </div>
      ) : (
        users.map(user => (
          <div key={user.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:shadow-md transition-shadow relative overflow-hidden">
            
            <div className="flex flex-col">
              <div className="flex items-center gap-3">
                <h3 className="font-bold text-slate-800 text-lg">{user.name}</h3>
                
                {}
                {user.isLocal ? (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-emerald-100 text-emerald-700 border border-emerald-200">
                    <span className="w-1 h-1 rounded-full bg-emerald-500 mr-1 animate-pulse"></span>
                    YEREL
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-sky-100 text-sky-700 border border-sky-200">
                    API
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                <span className="text-sm text-slate-500 flex items-center gap-1">✉️ {user.email}</span>
                {user.phone && <span className="text-sm text-slate-500 flex items-center gap-1">📞 {user.phone}</span>}
                {user.companyName && <span className="text-sm text-emerald-600 font-medium flex items-center gap-1">🏢 {user.companyName}</span>}
              </div>
            </div>

            <div className="flex gap-2 w-full md:w-auto">
              <button onClick={() => onEdit(user)} className="flex-1 md:flex-none bg-sky-50 text-sky-700 px-4 py-2 rounded-xl font-semibold hover:bg-sky-100 transition-colors border border-sky-100">Düzenle</button>
              <button onClick={() => onDelete(user.id)} className="flex-1 md:flex-none bg-rose-50 text-rose-700 px-4 py-2 rounded-xl font-semibold hover:bg-rose-100 transition-colors border border-rose-100 text-sm">Sil</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}