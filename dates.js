globalThis.SuniDate={
 today(){return new Intl.DateTimeFormat('sv-SE',{timeZone:'Europe/Helsinki'}).format(new Date())},
 parse(value){if(!value.trim())return '';const match=/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/.exec(value.trim());if(!match)return null;const [,day,month,year]=match.map(Number);const date=new Date(Date.UTC(year,month-1,day));if(date.getUTCFullYear()!==year||date.getUTCMonth()!==month-1||date.getUTCDate()!==day)return null;return `${year}-${String(month).padStart(2,'0')}-${String(day).padStart(2,'0')}`},
 format(value){return value.split('-').reverse().join('.')}
};
