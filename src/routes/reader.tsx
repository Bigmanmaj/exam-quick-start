import { createFileRoute } from '@tanstack/react-router';
import { ReaderPage } from '@/components/study-experience';
export const Route = createFileRoute('/reader')({
 head:()=>({meta:[{title:'Read and revise — Perlego Exam Sprint'},{name:'description',content:'Study your selected chapter and save your revision progress.'},{property:'og:title',content:'Read and revise — Perlego Exam Sprint'},{property:'og:description',content:'Study your selected chapter and save your revision progress.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),
 component:ReaderPage,
});
