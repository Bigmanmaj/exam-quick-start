import { createFileRoute } from '@tanstack/react-router';
import { TopicsPage } from '@/components/exam-setup';
export const Route = createFileRoute('/topics')({
 validateSearch:(search:Record<string,unknown>)=>({edit:search['edit']==='1'?true:undefined}),
 head:()=>({meta:[{title:'Choose revision topics — Perlego Exam Sprint'},{name:'description',content:'Choose the topics that matter for your exam.'},{property:'og:title',content:'Choose revision topics — Perlego Exam Sprint'},{property:'og:description',content:'Choose the topics that matter for your exam.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),
 component:()=>{const {edit}=Route.useSearch();return <TopicsPage edit={edit}/>;},
});
