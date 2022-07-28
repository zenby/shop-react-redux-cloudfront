import React, {useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import axios from 'axios'

const useStyles = makeStyles(theme => ({
  content: {
    padding: theme.spacing(3, 0, 3),
  },
}))

type CSVFileImportProps = {
  url: string
  title: string
}

export default function CSVFileImport({url, title}: CSVFileImportProps) {
  const classes = useStyles()
  const [file, setFile] = useState<any>()

  const onFileChange = (e: any) => {
    let files = e.target.files || e.dataTransfer.files
    if (!files.length) return
    setFile(files.item(0))
  }

  const removeFile = () => {
    setFile('')
  }

  const getAuthToken = () => localStorage.getItem('authorization_token')

  const uploadFile = async (e: any) => {
    const token = getAuthToken()

    // Get the presigned URL
    const response = await axios({
      method: 'GET',
      url,
      headers: token ? {Authorization: `Basic ${token}`} : {},
      params: {name: encodeURIComponent(file.name)},
    })
    if (response.status < 400) {
      console.log('File to upload: ', file.name)
      console.log('Uploading to: ', response.data)
      const result = await fetch(response.data, {
        method: 'PUT',
        body: file,
      })
      console.log('Result: ', result)
      setFile('')
    }
  }

  return (
    <div className={classes.content}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {!file ? (
        <input type="file" onChange={onFileChange} />
      ) : (
        <div>
          <button onClick={removeFile}>Remove file</button>
          <button onClick={uploadFile}>Upload file</button>
        </div>
      )}
    </div>
  )
}
