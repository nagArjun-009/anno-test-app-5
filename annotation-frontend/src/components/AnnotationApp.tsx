import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useAppDispatch, useAppSelector } from '../store';
import { setCurrentIndex } from '../store';
import {
  fetchImages,
  validateAnnotation,
  addComment,
  fetchComments,
  fetchErrors,
  type Image,
  type Comment,
  type ErrorLog,
} from '../lib/api';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Textarea } from './ui/textarea';

const AnnotationApp = () => {
  // State for annotation inputs
  const [label, setLabel] = useState('');
  const [color, setColor] = useState('');
  const [comment, setComment] = useState('');

  // Redux state for current image index
  const dispatch = useAppDispatch();
  const currentIndex = useAppSelector((state) => state.image.currentIndex);

  // Fetch images
  const {
    data: images = [],
    isLoading,
    error,
  } = useQuery<Image[]>({
    queryKey: ['images'],
    queryFn: fetchImages,
  });

  // Get current image
  const currentImage = images[currentIndex];

  // Fetch comments and errors for the current image
  const { data: comments = [] } = useQuery<Comment[]>({
    queryKey: ['comments', currentImage?._id],
    queryFn: () => fetchComments(currentImage?._id || ''),
    enabled: !!currentImage,
  });

  const { data: errors = [] } = useQuery<ErrorLog[]>({
    queryKey: ['errors', currentImage?._id],
    queryFn: () => fetchErrors(currentImage?._id || ''),
    enabled: !!currentImage,
  });

  // Mutation for validating annotations
  const validateMutation = useMutation({
    mutationFn: validateAnnotation,
    onSuccess: () => {
      alert('Validation successful!');
    },
    onError: (err: unknown) => {
      if (err instanceof Error) {
        // Check if err has a 'response' property (e.g., AxiosError)
        const apiErr = err as Error & { response?: { data?: { message?: string } } };
        alert(
          `Validation failed: ${apiErr.response?.data?.message || err.message}`
        );
      } else {
        alert(`Validation failed: ${String(err)}`);
      }
    },
  });

  // Mutation for adding comments
  const commentMutation = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      setComment('');
      // Invalidate comments query to refetch
      // Note: We can't use queryClient.invalidateQueries here due to sandbox restrictions
      alert('Comment added successfully!');
    },
  });

  // Navigation handlers
  const handlePrevious = () => {
    if (currentIndex > 0) {
      dispatch(setCurrentIndex(currentIndex - 1));
    }
  };

  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      dispatch(setCurrentIndex(currentIndex + 1));
    }
  };

  // Handle validation
  const handleValidate = () => {
    if (!currentImage || !label || !color) {
      alert('Please enter a label and color.');
      return;
    }
    validateMutation.mutate({
      imageId: currentImage._id,
      label,
      color,
    });
  };

  // Handle comment submission
  const handleAddComment = () => {
    if (!currentImage || !comment) {
      alert('Please enter a comment.');
      return;
    }
    commentMutation.mutate({
      imageId: currentImage._id,
      reviewerId: 'reviewer1', // Hardcoded for simplicity; in a real app, this would come from auth
      comment,
    });
  };

  if (isLoading) return <div className='text-center'>Loading...</div>;
  if (error)
    return (
      <div className='text-center text-red-500'>Error: {error.message}</div>
    );
  if (images.length === 0)
    return <div className='text-center'>No images available.</div>;

  return (
    <div className='container mx-auto p-4'>
      {/* Header */}
      <h1 className='text-2xl font-bold text-center mb-4'>
        Annotation Object Labelled Colour Test
      </h1>

      {/* Main Content */}
      <div className='grid grid-cols-1 gap-4'>
        {/* Image Display and Navigation */}
        <div className='flex items-center justify-center gap-4'>
          <Button onClick={handlePrevious} disabled={currentIndex === 0}>
            &lt;
          </Button>
          <div className='flex-1 max-w-md'>
            <img
              src={`http://localhost:8000/${currentImage.path}`}
              alt={currentImage.filename}
              className='w-full h-auto rounded-lg shadow-md'
            />
          </div>
          <Button
            onClick={handleNext}
            disabled={currentIndex === images.length - 1}
          >
            &gt;
          </Button>
        </div>

        {/* Annotation Inputs and Validate Button */}
        <div className='flex justify-center gap-4'>
          <Input
            placeholder='Label (e.g., Apple)'
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className='w-40'
          />
          <Input
            placeholder='Color (e.g., Red)'
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className='w-40'
          />
          <Button onClick={handleValidate}>Validate</Button>
        </div>

        {/* Reviewer, Comments, and Errors */}
        <div className='grid grid-cols-3 gap-4'>
          {/* Reviewer */}
          <Card>
            <CardHeader>
              <CardTitle>Reviewer</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Reviewer: reviewer1</p> {/* Hardcoded for simplicity */}
            </CardContent>
          </Card>

          {/* Comments */}
          <Card>
            <CardHeader>
              <CardTitle>Comments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='mb-4'>
                {comments.map((c) => (
                  <p key={c._id} className='text-sm'>
                    {c.comment} - {new Date(c.createdAt).toLocaleString()}
                  </p>
                ))}
              </div>
              <Textarea
                placeholder='Add a comment...'
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className='mb-2'
              />
              <Button onClick={handleAddComment}>Add Comment</Button>
            </CardContent>
          </Card>

          {/* Errors */}
          <Card>
            <CardHeader>
              <CardTitle>Errors</CardTitle>
            </CardHeader>
            <CardContent>
              {errors.map((e) => (
                <p key={e._id} className='text-sm text-red-500'>
                  {e.error} - {new Date(e.createdAt).toLocaleString()}
                </p>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AnnotationApp;
