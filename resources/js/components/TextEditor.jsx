import React from 'react'
import ReactQuill from 'react-quill'

const TextEditor = (props) => {

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ]
  }

  return (
    <ReactQuill
      value={props.value}
      onChange={props.change}
      formats={formats}
      modules={modules}
      style={{height: props.height, marginBottom: '35px'}}
    />
  )
}

export default TextEditor
