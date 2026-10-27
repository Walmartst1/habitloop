import { isDateScheduled, toLocalDateString } from './dateUtils';
export const calculateStreak = (habit, completions) => {
  const completed = new Set(completions.filter(c=>c.habitId===habit.id && c.completed).map(c=>c.date));
  let cur=0; let d=new Date(); for(let i=0;i<365;i++){ const ds=toLocalDateString(d); if(!isDateScheduled(habit,ds)){d.setDate(d.getDate()-1); continue;} if(completed.has(ds)) cur++; else break; d.setDate(d.getDate()-1); }
  const sorted=[...completed].sort(); let temp=0,best=0; for(let i=0;i<sorted.length;i++){ if(i===0) temp=1; else{ const diff=(new Date(sorted[i]+'T12:00:00')-new Date(sorted[i-1]+'T12:00:00'))/86400000; temp=diff===1?temp+1:1; } best=Math.max(best,temp); }
  return {current:cur,best:Math.max(best,cur)};
};
export const getDailyProgress = (habits, completions, dateStr) => {
  const scheduled=habits.filter(h=>isDateScheduled(h,dateStr)&&h.status==='active'); if(!scheduled.length) return 0;
  const done=scheduled.filter(h=>completions.some(c=>c.habitId===h.id&&c.date===dateStr&&c.completed)).length; return Math.round(done/scheduled.length*100);
};