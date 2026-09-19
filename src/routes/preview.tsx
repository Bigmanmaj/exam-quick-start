import { createFileRoute } from '@tanstack/react-router';
import { ReaderPage } from '@/components/study-experience';
export const Route = createFileRoute('/preview')({
 head:()=>({meta:[{title:'Preview your chapter — Perlego Exam Sprint'},{name:'description',content:'Read a sample before choosing your simulated subscription.'},{property:'og:title',content:'Preview your chapter — Perlego Exam Sprint'},{property:'og:description',content:'Read a sample before choosing your simulated subscription.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),
 component:() => <ReaderPage preview />,
});
