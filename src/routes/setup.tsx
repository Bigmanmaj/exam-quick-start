import { createFileRoute } from '@tanstack/react-router';
import { SetupPage } from '@/components/exam-setup';
export const Route = createFileRoute('/setup')({
 head:()=>({meta:[{title:'Your exam — Perlego Exam Sprint'},{name:'description',content:'Set your module and exam date for focused revision.'},{property:'og:title',content:'Your exam — Perlego Exam Sprint'},{property:'og:description',content:'Set your module and exam date for focused revision.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),
 component:SetupPage,
});
