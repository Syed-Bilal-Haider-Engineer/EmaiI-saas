import React from 'react';
import EmailEditor, { EditorRef, EmailEditorProps } from 'react-email-editor';
interface EmailEditorProps {
  subjectTitle: string;
}

const EmailEditor= (props:EmailEditorProps) => {
  return (
    <div>
      <h1>{props.subjectTitle}</h1>
      {/* Add your email editor logic here */}
    </div>
  );
};

export default EmailEditor;
