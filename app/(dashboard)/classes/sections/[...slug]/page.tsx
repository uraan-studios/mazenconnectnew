import AddSection from '@/components/classes/sections/AddSection';
import SectionTable from '@/components/classes/sections/SectionTable';
import AnimatedHeading from '@/components/general/animatedHeading';
import Link from 'next/link';
import React, { Suspense } from 'react';
import { ArrowLeftToLineIcon } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

type tParams = Promise<{ slug: [id: string, name: string] }>;

const SectionPage = async ({ params }: { params: tParams }) => {
  const { slug } = await params;
  const id = slug[0];
  const name = slug[1];

  return (
    <div className="py-6 space-y-4">
      <Link href="/classes" className="p-4">
        <div className="flex gap-4 items-center">
          <ArrowLeftToLineIcon className="h-5 w-5 text-primary-foreground hover:text-primary-foreground-hover" />
          <p className="text-lg font-semibold">Go Back</p>
        </div>
      </Link>
      <div>
        <AnimatedHeading
          className="font-misologist font-light text-2xl text-primary"
          title="Manage"
          varient="heading"
        />
        <AnimatedHeading
          className="font-misologist font-normal"
          title={`${decodeURIComponent(name).replace(/-/g, ' ')} Section`}
          varient="heading"
        />

        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/classes">Classes</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Section</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <SectionTable id={parseInt(id)} />

      <Suspense
        fallback={
          <Skeleton className="min-h-64 px-6 py-8 space-y-6">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-36 w-full" />
          </Skeleton>
        }
      >
        <AddSection classId={parseInt(id)} />
      </Suspense>
    </div>
  );
};

export default SectionPage;
