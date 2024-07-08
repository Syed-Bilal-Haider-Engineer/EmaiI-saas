'use client';
import { GetEmailDetails } from '@/app/actions/getEmails.details';
import { saveEmail } from '@/app/actions/save.email';
import { DefaultJsonData } from '@/assets/mails/default';
import { useClerk } from '@clerk/nextjs';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import EmailEditor, { EditorRef, EmailEditorProps } from 'react-email-editor';
import { toast } from 'react-toastify';

interface EmailEditorStringProps {
  subjectTitle: string;
}

const MailEditor = ({subjectTitle}: EmailEditorStringProps) => {
  const [loading, setLoading] = useState(true);
  const emailEditorRef = useRef<EditorRef>(null);
  const [jsonData, setJsonData] = useState<any | null>(DefaultJsonData);
  const { user } = useClerk();
  const history = useRouter();
  const exportHtml = () => {
    const unlayer = emailEditorRef.current?.editor;

    unlayer?.exportHtml(async (data) => {
      const { design, html } = data;
      setJsonData(design);
    })
  }

  const saveDraft = () => {
    const unlayer = emailEditorRef.current?.editor;

    unlayer?.exportHtml(async (data) => {
      const { design } = data;
      await saveEmail({
        title: subjectTitle,
        content: JSON.stringify(design),
        newsLetterOwnerId: user?.id!,
      }).then((res: any) => {
        toast.success(res.message);
        history.push("/dashboard/write");
      });
    });
  }

  const onReady : EmailEditorProps["onReady"]= () => {
    const unlayer: any = emailEditorRef.current?.editor;
    unlayer.loadDesign(jsonData);
  }

  useEffect(() => {
    getEmailDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);


  const getEmailDetails = async () => {
    await GetEmailDetails({
      title: subjectTitle,
      newsLetterOwnerId: user?.id!,
    }).then((res: any) => {
      if (res) {
        setJsonData(JSON.parse(res?.content));
      }
      setLoading(false);
    });
  };

  return (
    <>
      {!loading && (
        <div className="w-full h-[90vh] relative">
          <EmailEditor
            minHeight={"80vh"}
            ref={emailEditorRef}
            onReady={onReady}
            options={{
              version: "latest",
              appearance: {
                theme: "modern_light"
              }
            }}
          />
          <div className="absolute bottom-0 flex items-center justify-end gap-4 right-0 w-full border-t p-3">
            <Button
              className="bg-transparent cursor-pointer flex items-center gap-1 text-black border border-[#00000048] text-lg rounded-lg"
              onClick={saveDraft}
            >
              <span className="opacity-[.7]">Save Draft</span>
            </Button>
            <Button
              className="bg-[#000] text-white cursor-pointer flex items-center gap-1 border text-lg rounded-lg"
              onClick={exportHtml}
            >
              <span>Send</span>
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default MailEditor;
