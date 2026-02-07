import React, { useEffect, useRef } from 'react';
import { Card, Button, Space, Typography, Avatar, Divider } from 'antd';
import { CommentOutlined, UserOutlined } from '@ant-design/icons';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const { Text } = Typography;

const TicketCommentsSection = ({
  ticket,
  comments,
  currentUser,
  canComment,
  commentQuillRef,
  commentQuillInstanceRef,
  onAddComment,
  commentMutationPending,
  canUpdateTicket,
}) => {
  useEffect(() => {
    if (!ticket || !currentUser || !canComment || !commentQuillRef.current) return;

    const timer = setTimeout(() => {
      if (commentQuillRef.current && !commentQuillInstanceRef.current) {
        try {
          commentQuillInstanceRef.current = new Quill(commentQuillRef.current, {
            theme: 'snow',
            placeholder: 'Add a comment...',
            modules: {
              toolbar: [
                [{ 'header': [1, 2, false] }],
                ['bold', 'italic', 'underline'],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                ['link'],
                ['clean']
              ]
            }
          });
        } catch {

        }
      }
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [ticket, currentUser, canComment, commentQuillRef]);

  return (
    <Card className="standard-card ticket-section-card">
      <div className="section-header">
        <Text strong className="section-title">
          <CommentOutlined className="icon-blue" />
          Comments ({comments.length})
        </Text>
      </div>

      {comments.length === 0 ? (
        <div className="empty-state">
          <CommentOutlined className="empty-state-icon" />
          <Text type="secondary" className="empty-comment-text">No comments yet</Text>
        </div>
      ) : (
        <div className="comments-scrollable-container comments-container">
          {comments.map((comment, index) => (
            <div 
              key={comment.id || index}
              className={`comment-item ${index < comments.length - 1 ? 'comment-item-bordered' : ''}`}
            >
              <div className="comment-header">
                <Avatar 
                  src={comment.author?.displayPicture} 
                  icon={<UserOutlined />}
                  size={40}
                  className="comment-avatar comment-avatar-large"
                />
                <div className="comment-content">
                  <div className="comment-meta">
                    <Text strong className="comment-author">
                      {comment.author?.username || comment.author?.email}
                    </Text>
                    <Text type="secondary" className="comment-date">
                      {new Date(comment.createdAt).toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </Text>
                  </div>
                  <div 
                    className="comment-body"
                    dangerouslySetInnerHTML={{ __html: comment.content }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Divider className="divider-standard" />

      {!canUpdateTicket ? (
          <div className="comment-warning comment-warning-alt">
            <Text className="comment-warning-text">
              This ticket has already been deployed. Comments are no longer allowed.
            </Text>
          </div>
        ) : canComment ? (
        <div>
          <div className="metadata-section-spacing">
            <Text strong className="metadata-label-text">
              Add a comment
            </Text>
          </div>
          <div className="quill-editor comment-editor">
            <div ref={commentQuillRef} className="quill-editor-container" />
          </div>
          <div className="flex-end comment-actions">
            <Button
              type="primary"
              className="add-comment-button"
              onClick={onAddComment}
              loading={commentMutationPending}
              icon={<CommentOutlined />}
              size="middle"
            >
              Add Comment
            </Button>
          </div>
        </div>
      ) : (
        <div className="comment-warning comment-warning-alt">
          <Text className="comment-warning-text">
            {!ticket?.assignedTo 
              ? 'Cannot comment on unassigned ticket. Please assign the ticket first.'
              : 'Only assigned user or admin can add comments'
            }
          </Text>
        </div>
      )}
    </Card>
  );
};

export default TicketCommentsSection;

