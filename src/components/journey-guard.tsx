import { useEffect } from 'react';
import { useNavigate, useRouterState } from '@tanstack/react-router';
import { useOnboardingOptional } from '@/lib/onboarding-context';
export function JourneyGuard(){
 const s=useOnboardingOptional();const navigate=useNavigate();const path=useRouterState({select:state=>state.location.pathname});
 useEffect(()=>{if(!s||!s.hydrated||path==='/'||path==='/login')return;
 if(!s.query.trim()&&!(path==='/study'&&s.signedUp)){navigate({to:'/',replace:true});return;}
 if((path==='/reader'||path==='/study')&&!s.signedUp)navigate({to:'/login',replace:true});
 },[s,path,navigate]);
 return null;
}
