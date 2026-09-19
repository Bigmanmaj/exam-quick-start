import { useEffect } from 'react';
import { useNavigate, useRouterState } from '@tanstack/react-router';
import { useOnboarding } from '@/lib/onboarding-context';
export function JourneyGuard(){
 const s=useOnboarding();const navigate=useNavigate();const path=useRouterState({select:state=>state.location.pathname});
 useEffect(()=>{if(!s.hydrated||path==='/'||path==='/setup')return;
 if(!s.query.trim()||!s.examDate){navigate({to:'/setup',replace:true});return;}
 if(path!=='/topics'&&!s.topics.length){navigate({to:'/topics',replace:true});return;}
 if((path==='/reader'||path==='/study')&&!s.signedUp)navigate({to:'/signup',replace:true});
 },[s.hydrated,s.query,s.examDate,s.topics.length,s.signedUp,path,navigate]);
 return null;
}
