// import AddSection from '@/components/classes/sections/AddSection';
// import SectionTable from '@/components/classes/sections/SectionTable';
// import AnimatedHeading from '@/components/general/animatedHeading';
// import Link from 'next/link';
// import React, { Suspense } from 'react';
// import { ArrowLeftToLineIcon } from 'lucide-react';
// import { Skeleton } from '@/components/ui/skeleton';
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from '@/components/ui/breadcrumb';


// const SectionPage = async ({ params }: {params: Promise<{id: string, name: string}>}) => {
//   const slug = (await params)
//   return (
//     <div className="py-6 space-y-4">
//       <Link href="/classes" className="p-4">
//         <div className="flex gap-4 items-center">
//           <ArrowLeftToLineIcon className="h-5 w-5 text-primary-foreground hover:text-primary-foreground-hover" />
//           <p className="text-lg font-semibold">Go Back</p>
//         </div>
//       </Link>
//       <div>
//         <AnimatedHeading
//           className="font-misologist font-light text-2xl text-primary"
//           title="Manage"
//           varient="heading"
//         />
//         <AnimatedHeading
//           className="font-misologist font-normal"
//           title={`${decodeURIComponent(slug.name).replace(/-/g, ' ')} Section`}
//           varient="heading"
//         />

//         <Breadcrumb>
//           <BreadcrumbList>
//             <BreadcrumbItem>
//               <BreadcrumbLink href="/">Home</BreadcrumbLink>
//             </BreadcrumbItem>
//             <BreadcrumbSeparator />
//             <BreadcrumbItem>
//               <BreadcrumbLink href="/classes">Classes</BreadcrumbLink>
//             </BreadcrumbItem>
//             <BreadcrumbSeparator />
//             <BreadcrumbItem>
//               <BreadcrumbPage>Section</BreadcrumbPage>
//             </BreadcrumbItem>
//           </BreadcrumbList>
//         </Breadcrumb>
//       </div>

//       <SectionTable id={parseInt(slug.id)} />

//       <Suspense
//         fallback={
//           <Skeleton className="min-h-64 px-6 py-8 space-y-6">
//             <Skeleton className="h-6 w-24" />
//             <Skeleton className="h-36 w-full" />
//           </Skeleton>
//         }
//       >
//         <AddSection classId={parseInt(slug.id)} />
//       </Suspense>
//     </div>
//   );
// };

// export default SectionPage;

// # Environment variables declared in this file are automatically made available to Prisma.
// # See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

// # Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
// # See the documentation for all the connection string options: https://pris.ly/d/connection-strings

// DATABASE_URL="mysql://hawkener_foodify:merapa55word1234@h35.eu.core.hostnext.net:3306/hawkener_mazenconnectnew"

// # DATABASE_URL="mysql://mazensch_connect:merapa55word1234@h35.eu.core.hostnext.net:3306/mazensch_mazenconnect"

// # Mazen@Schools1234 = $2b$10$bCMRhV3MzNCkYC0/tR82xeAFCDcMaqF/oy.Vpkx9iV6stO42S5WhG
// # $2b$10$XJ3fU2KYTMn.xAIVCsrEZu.fJNgVBRUX06oDSQSTq7wJpx3GAOmw2
// # yfozuwlwaladm5to
