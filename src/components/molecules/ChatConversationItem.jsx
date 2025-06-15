import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns'
import ApperIcon from '@/components/ApperIcon'

function ChatConversationItem({ 
  conversation, 
  isSelected = false, 
  onClick 
}) {
  const navigate = useNavigate()
  
  const handleClick = () => {
    if (onClick) {
      onClick(conversation)
    }
  }
  
  const handleUserClick = (e) => {
    e.stopPropagation()
    navigate(`/profile/${conversation.user.username}`)
  }
  
  return (
    <motion.div
      className={`
        flex items-center gap-3 p-4 cursor-pointer transition-colors
        ${isSelected ? 'bg-blue-50 border-r-2 border-blue-500' : 'hover:bg-gray-50'}
        ${conversation.unreadCount > 0 ? 'bg-blue-25' : ''}
      `}
      onClick={handleClick}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* User Avatar */}
      <div className="relative flex-shrink-0" onClick={handleUserClick}>
        <ApperIcon 
          src={conversation.user.avatar} 
          alt={conversation.user.displayName}
          className="w-12 h-12 rounded-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
        />
        {conversation.isOnline && (
          <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
        )}
      </div>
      
      {/* Conversation Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <h3 
            className={`font-medium text-gray-900 truncate cursor-pointer hover:text-blue-600 transition-colors ${
              conversation.unreadCount > 0 ? 'font-semibold' : ''
            }`}
            onClick={handleUserClick}
          >
            {conversation.user.displayName}
          </h3>
          <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
            {formatDistanceToNow(new Date(conversation.lastMessage.timestamp), { addSuffix: true })}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <p className={`text-sm text-gray-600 truncate ${
            conversation.unreadCount > 0 ? 'font-medium text-gray-900' : ''
          }`}>
            {conversation.lastMessage.isFromCurrentUser && (
              <span className="text-gray-400 mr-1">You: </span>
            )}
            {conversation.lastMessage.text}
          </p>
          
          {conversation.unreadCount > 0 && (
            <div className="flex-shrink-0 ml-2">
              <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-blue-500 rounded-full">
                {conversation.unreadCount > 9 ? '9+' : conversation.unreadCount}
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default ChatConversationItem