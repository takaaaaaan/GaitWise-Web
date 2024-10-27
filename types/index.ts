import { ObjectId } from 'mongoose'


// ====== analyst PARAMS
export type CreateAnalystParams = {
    firstName: string
    lastName: string
    email: string
    analyst_report: Array<ObjectId>
}

export type UpdateAnalystParams = {
    firstName: string
    lastName: string
    email: string
    analyst_report: Array<ObjectId>
}




// ====== URL QUERY PARAMS
export type UrlQueryParams = {
    params: string
    key: string
    value: string | null
  }
  
  export type RemoveUrlQueryParams = {
    params: string
    keysToRemove: string[]
  }
  
  export type SearchParamProps = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
  }



export type Project = {
  id: number;
  name: string;
};

export type Question = {
  id: number;
  type: 'multiple' | 'text';
  question: string;
  options?: string[];
}

export type DragItem = {
  index: number;
  id: number;
  type: string;
}
