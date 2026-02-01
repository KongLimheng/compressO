import { event } from '@tauri-apps/api'
import { useEffect } from 'react'

type OpenWithAppProps = {
  onFiles: (files: string[]) => void
}

// Listen for `Open with CompressO` event that trigger when we perform Open with file explorer
function OpenWithApp({ onFiles }: OpenWithAppProps) {
  useEffect(() => {
    const unlistenPromise = event.listen<string[]>('open-with-app', (evt) => {
      const filePaths = evt.payload
      if (filePaths && filePaths.length > 0) {
        onFiles(filePaths)
      }
    })

    return () => {
      unlistenPromise.then((unlisten) => unlisten())
    }
  }, [onFiles])

  return null
}

export default OpenWithApp
