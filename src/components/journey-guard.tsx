import { useEffect } from 'react';
import { useNavigate, useRouterState } from '@tanstack/react-router';
import { useOnboarding } from '@/lib/onboarding-context';
export function JourneyGuard(){
 const s=useOnboarding();const navigate=useNavigate();const path=useRouterState({select:state=>state.location.pathname});
 useEffect(()=>{if(!s.hydrated||path==='/')return;
 if(!s.query.trim()){navigate({to:'/',replace:true});return;}
 if((path==='/reader'||path==='/study')&&!s.signedUp)navigate({to:'/signup',replace:true});
 },[s.hydrated,s.query,s.topics.length,s.signedUp,path,navigate]);
 return null;
}
