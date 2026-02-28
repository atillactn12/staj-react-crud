import { useState, useEffect } from 'react';
import type { User } from '../Interfaces/User';

interface Props {
  onAdd: (user: User) => void;
  onUpdate: (user: User) => void;
  editingUser: User | null;
}

export default function UserForm({ onAdd, onUpdate, editingUser }: Props) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', companyName: '' });
  const [countryCode, setCountryCode] = useState('+90');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const countries = [
    { code: '+90', flag: 'tr', name: 'Türkiye', placeholder: '532 123 4567', mask: '### ### ####' },
    { code: '+1',  flag: 'us', name: 'ABD', placeholder: '555 123 4567', mask: '### ### ####' },
    { code: '+44', flag: 'gb', name: 'İngiltere', placeholder: '7700 900077', mask: '#### ######' },
    { code: '+49', flag: 'de', name: 'Almanya', placeholder: '1512 3456789', mask: '#### #######' },
    { code: '+33', flag: 'fr', name: 'Fransa', placeholder: '6 12 34 56 78', mask: '# ## ## ## ##' }
  ];

  const selectedCountry = countries.find(c => c.code === countryCode) || countries[0];

  
  const formatPhoneNumber = (value: string, mask: string) => {
    if (!value) return value;
    const cleanValue = value.replace(/\D/g, ''); 
    let i = 0;
    let formatted = mask.replace(/#/g, () => {
      const char = cleanValue[i] || '';
      i++;
      return char;
    });
    return formatted.trimEnd(); 
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const formattedValue = formatPhoneNumber(rawValue, selectedCountry.mask);
    
    
    const maxDigits = selectedCountry.mask.replace(/[^#]/g, '').length;
    if (rawValue.replace(/\D/g, '').length <= maxDigits) {
      setFormData({ ...formData, phone: formattedValue });
    }
  };

  useEffect(() => {
    if (editingUser) {
      let cCode = '+90';
      let pNumber = editingUser.phone || '';
      if (pNumber.includes(' ')) {
         const parts = pNumber.split(' ');
         if (parts[0].startsWith('+')) {
             cCode = parts[0];
             pNumber = parts.slice(1).join(' ');
         }
      }
      setCountryCode(cCode);
      setFormData({
        name: editingUser.name,
        email: editingUser.email,
        phone: pNumber,
        companyName: editingUser.companyName
      });
    }
  }, [editingUser]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const combinedPhone = formData.phone ? `${countryCode} ${formData.phone}` : '';
    if (editingUser) {
      onUpdate({ ...formData, phone: combinedPhone, id: editingUser.id, isLocal: editingUser.isLocal });
    } else {
      onAdd({ ...formData, phone: combinedPhone, id: Date.now().toString(), isLocal: true });
    }
    setFormData({ name: '', email: '', phone: '', companyName: '' });
    setCountryCode('+90');
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 mb-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b pb-2 flex items-center gap-2">
        {editingUser ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-emerald-600"><path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" /></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-emerald-600"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM4 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 10.374 21c-2.331 0-4.512-.645-6.374-1.766Z" /></svg>
        )}
        {editingUser ? 'Kullanıcı Bilgilerini Düzenle' : 'Yeni Kullanıcı Kaydı'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-1">Ad Soyad *</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>
              </div>
              <input required type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all" placeholder="Örn: Deniz Demir" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-1">E-posta Adresi *</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg>
              </div>
              <input required type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all" placeholder="Örn: deniz.demir@gmail.com" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-1">Telefon Numarası</label>
            <div className="flex relative">
              <div className="relative">
                <button type="button" onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="h-full bg-slate-50 border border-slate-200 border-r-0 rounded-l-xl px-3 flex items-center gap-2 text-slate-600 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 relative z-20">
                  <img src={`https://flagcdn.com/w20/${selectedCountry.flag}.png`} alt="flag" className="w-5 h-auto rounded-sm" />
                  <span className="text-sm font-medium">{selectedCountry.code}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
                {isDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)}></div>
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl z-30 py-2 overflow-hidden">
                      {countries.map((country) => (
                        <button key={country.code} type="button" className="w-full text-left px-4 py-2 hover:bg-emerald-50 flex items-center gap-3" onClick={() => { setCountryCode(country.code); setIsDropdownOpen(false); setFormData({...formData, phone: ''}); }}>
                          <img src={`https://flagcdn.com/w20/${country.flag}.png`} alt={country.name} className="w-5 h-auto rounded-sm" />
                          <span className="text-sm text-slate-700 font-medium flex-1">{country.name}</span>
                          <span className="text-xs text-slate-500">{country.code}</span>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.273-3.973-6.869-6.869l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" /></svg>
                </div>
                {}
                <input type="text" value={formData.phone} onChange={handlePhoneChange} className="w-full bg-slate-50 border border-slate-200 rounded-r-xl py-3 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all" placeholder={selectedCountry.placeholder} />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-1">Şirket / Kurum</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" /></svg>
              </div>
              <input type="text" value={formData.companyName} onChange={e => setFormData({ ...formData, companyName: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all" placeholder="Örn: Nexus Yazılım A.Ş." />
            </div>
          </div>
        </div>
        <button type="submit" className="w-full md:w-auto mt-6 bg-emerald-600 text-white font-medium px-8 py-3 rounded-xl shadow-sm hover:bg-emerald-700 transition-all flex items-center justify-center gap-2">
          {editingUser ? 'Değişiklikleri Kaydet' : 'Kullanıcıyı Sisteme Ekle'}
        </button>
      </form>
    </div>
  );
}