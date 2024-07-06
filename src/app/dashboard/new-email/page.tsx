'use client'
import EmailEditor from '@/shared/components/email-editor/email.editor';
import { ICONS } from '@/shared/utils/icons'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation';
import React from 'react'

function page() {
    const searchParams = useSearchParams();
    const subject: string = searchParams.get("subject")!;
    const subjectTitle = subject.replace(/-/g, " ");
  return (
    <div className="w-full flex bg-[#F7F7F7]">
      <div className="w-full p-5 bg-white rounded-r-xl">
        {/* back arrow */}
        <Link
          href={"/dashboard/write"}
          className="opacity-[.7] w-min flex text-xl items-center"
        >
          <span>{ICONS.backArrow}</span>
          <span>Exit</span>
        </Link>
        {/* email editor */}
        <div className="my-5">
          <EmailEditor subjectTitle={subjectTitle} />
        </div>
      </div>
    </div>
  )
}

export default page
