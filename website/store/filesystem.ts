import { create } from "zustand"


type File = {
  name: string
  type: "folder" | "file"
  path: string
}


type State = {
  fileslist: File[]
  path: string
  setFileslist: (fileslist: File[]) => void
  setPath: (path: string) => void
  update: number,
  setUpdate: (update: number) => void
  selectMode: boolean
  setSelectMode: (selectMode: boolean) => void
  selected: string[]
  setSelected: (selected: string[]) => void
}

export const useFilesystem = create<State>((set) => ({
  fileslist: [],
  path: "/home/tchisama/bubblebox-testing",
  setFileslist: (fileslist) => set({fileslist}),
  setPath: (path) => set({path}),
  selectMode: false,
  update: 0,
  setUpdate: (update) => set({update}),
  setSelectMode: (selectMode) => set({selectMode}),
  selected: [],
  setSelected: (selected) => set({selected})
}))
