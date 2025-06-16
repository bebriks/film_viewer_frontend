import React, { useState } from 'react';
import { 
  Avatar, 
  Button,
  Input, 
  List, 
  Typography,
  Popconfirm,
  message 
} from 'antd';
import { Comment } from '@ant-design/compatible';
import { 
  UserOutlined,
  SendOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import moment from 'moment';
import { TComment, TUser } from '../../api/types';

const { Text } = Typography;
const { TextArea } = Input;


interface CommentProps {
  comment: TComment;
  currentUser?: TUser;
  onReply?: (parentId: string, text: string) => void;
  onDelete?: (id: string) => void;
}

const CommentItem: React.FC<CommentProps> = ({ 
  comment, 
  currentUser, 
  onReply, 
  onDelete 
}) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState('');
  
  const handleReply = () => {
    if (replyText.trim() && onReply) {
      onReply(comment.id, replyText);
      setReplyText('');
      setIsReplying(false);
    }
  };
  
  const handleDelete = () => {
    if (onDelete) {
      onDelete(comment.id);
    }
  };
  
  const actions = [
    <Button 
      key="reply" 
      type="link" 
      size="small"
      onClick={() => setIsReplying(!isReplying)}
    >
      Ответить
    </Button>,
    
    ...(currentUser?.id === comment.user?.id ? [
      <Popconfirm
        key="delete"
        title="Удалить комментарий?"
        description="Это действие нельзя отменить"
        onConfirm={handleDelete}
        okText="Да"
        cancelText="Нет"
      >
        <Button 
          type="link" 
          size="small"
          danger
          icon={<DeleteOutlined />}
        >
          Удалить
        </Button>
      </Popconfirm>
    ] : [])
  ];
  
  return (
    <Comment
      actions={actions}
      author={<Text strong>{comment.user?.name}</Text>}
      avatar={
        <Avatar 
          icon={<UserOutlined />} 
          style={{ backgroundColor: '#1890ff' }}
          alt={comment.user?.name}
        />
      }
      content={<Text>{comment.text}</Text>}
      datetime={
        <Tooltip title={moment(comment.createdAt).format('YYYY-MM-DD HH:mm:ss')}>
          <span>{moment(comment.createdAt).fromNow()}</span>
        </Tooltip>
      }
    >
        
      {isReplying && (
        <div style={{ marginTop: 16 }}>
          <TextArea
            rows={3}
            placeholder="Напишите ваш ответ..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            style={{ marginBottom: 8 }}
          />
          <Button 
            type="primary" 
            onClick={handleReply}
            icon={<SendOutlined />}
            style={{ marginRight: 8 }}
          >
            Отправить
          </Button>
          <Button onClick={() => setIsReplying(false)}>
            Отмена
          </Button>
        </div>
      )}

      {comment.replies.length > 0 && (
        <div style={{ marginLeft: 40 }}>
          {comment.replies.map((reply) => (
            <CommentItem 
              key={reply.id}
              comment={reply}
              currentUser={currentUser}
              onReply={onReply}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </Comment>
  );
};

interface CommentSectionProps {
  comments: Comment[];
  currentUser?: TUser;
  onAddComment: (text: string, parentId?: string) => void;
  onDeleteComment: (id: string) => void;
}

export const CommentSection: React.FC<CommentSectionProps> = ({
  comments,
  currentUser,
  onAddComment,
  onDeleteComment
}) => {
  const [commentText, setCommentText] = useState('');
  
  const handleSubmit = () => {
    if (commentText.trim()) {
      onAddComment(commentText);
      setCommentText('');
      message.success('Комментарий добавлен');
    }
  };
  
  const handleReply = (parentId: string, text: string) => {
    onAddComment(text, parentId);
    message.success('Ответ добавлен');
  };
  
  return (
    <div style={{ maxWidth: 800, margin: '0' }}>
      <Comment
        style={{ backgroundColor: 'transparent' }}
        avatar={
          <Avatar 
            icon={<UserOutlined />} 
            style={{ backgroundColor: currentUser ? '#1890ff' : '#ccc' }} 
            alt={currentUser?.name || 'Гость'} 
          />
        }
        content={
          <>
            <TextArea
              rows={4}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder={
                currentUser 
                  ? "Напишите ваш комментарий..." 
                  : "Войдите, чтобы оставить комментарий"
              }
              disabled={!currentUser}
            />
            <Button 
              type="primary" 
              onClick={handleSubmit}
              icon={<SendOutlined />}
              style={{ marginTop: 12 }}
              disabled={!commentText.trim() || !currentUser}
            >
              Отправить
            </Button>
          </>
        }
      />
      
      <List
        className="comment-list"
        header={`${comments.length} комментариев`}
        itemLayout="horizontal"
        dataSource={comments}
        renderItem={(item) => (
          <li style={{ marginBottom: 24 }}>
            <CommentItem 
              comment={item} 
              currentUser={currentUser}
              onReply={handleReply}
              onDelete={onDeleteComment}
            />
          </li>
        )}
        style={{ marginTop: 24 }}
        locale={{ emptyText: "Пока нет комментариев. Будьте первым!" }}
      />
    </div>
  );
};

const Tooltip: React.FC<{ title: string; children: React.ReactNode }> = ({ 
  title, 
  children 
}) => (
  <span title={title} style={{ cursor: 'help' }}>
    {children}
  </span>
);