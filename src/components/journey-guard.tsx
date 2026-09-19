import { useEffect } from 'react';
import { useNavigate, useRouterState } from '@tanstack/react-router';
import { useOnboarding } from '@/lib/onboarding-context';
export function JourneyGuard(){
 const s=useOnboarding();const navigate=useNavigate();const path=useRouterState({select:state=>state.location.pathname});
 useEffect(()=>{if(!s.hydrated||path==='/'||path==='/login')return;
 if(!s.query.trim()&&!(path==='/study'&&s.signedUp)){navigate({to:'/',replace:true});return;}
 if((path==='/reader'||path==='/study')&&!s.signedUp)navigate({to:'/login',replace:true});
 },[s.hydrated,s.query,s.topics.length,s.signedUp,path,navigate]);
 return null;
}
