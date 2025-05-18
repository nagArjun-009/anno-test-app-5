import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});

export interface Image {
  _id: string;
  filename: string;
  path: string;
  uploadedAt: string;
}

export interface Annotation {
  _id: string;
  imageId: string;
  label: string;
  color: string;
  createdAt: string;
}

export interface Comment {
  _id: string;
  imageId: string;
  reviewerId: string;
  comment: string;
  createdAt: string;
}

export interface ErrorLog {
  _id: string;
  imageId: string;
  annotationId: string;
  error: string;
  createdAt: string;
}

export const fetchImages = async (): Promise<Image[]> => {
  const response = await api.get('/images');
  return response.data;
};

export const validateAnnotation = async (data: {
  imageId: string;
  label: string;
  color: string;
}): Promise<Annotation> => {
  const response = await api.post('/images/validate', data);
  return response.data.annotation;
};

export const addComment = async (data: {
  imageId: string;
  reviewerId: string;
  comment: string;
}): Promise<Comment> => {
  const response = await api.post('/images/comment', data);
  return response.data;
};

export const fetchComments = async (imageId: string): Promise<Comment[]> => {
  const response = await api.get(`/images/comments/${imageId}`);
  return response.data;
};

export const fetchErrors = async (imageId: string): Promise<ErrorLog[]> => {
  const response = await api.get(`/images/errors/${imageId}`);
  return response.data;
};
