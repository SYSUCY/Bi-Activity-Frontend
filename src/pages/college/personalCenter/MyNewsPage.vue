# MyMessages.vue
<template>
  <div class="container">
    <!-- 左侧联系人列表 -->
    <div class="contact-list">
      <div class="section-title">近期消息</div>
      <el-scrollbar>
        <div v-for="conv in conversations" 
             :key="conv.id" 
             class="contact-item"
             :class="{ 'active': currentConversation?.id === conv.id }"
             @click="selectConversation(conv)">
          <el-avatar 
            :size="40" 
            :src="getContactAvatar(conv)" 
          />
          <div class="contact-info">
            <div class="contact-name">{{ getContactName(conv) }}</div>
            <div class="last-message">{{ conv.last_message?.content || '暂无消息' }}</div>
          </div>
        </div>
      </el-scrollbar>
    </div>

    <!-- 右侧聊天区域 -->
    <div class="chat-area">
      <!-- 未选择联系人时的提示 -->
      <div v-if="!currentConversation" class="no-contact">
        <el-empty description="选择一个联系人开始聊天" />
      </div>

      <!-- 聊天界面 -->
      <template v-else>
        <!-- 聊天标题 -->
        <div class="chat-header">
          <span>{{ getContactName(currentConversation) }}</span>
          <el-dropdown>
            <el-button :icon="More" circle />
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="deleteConversation">清空聊天记录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>

        <!-- 消息列表 -->
        <div class="message-list" ref="messageList">
          <el-scrollbar>
            <div v-for="message in messages" 
                 :key="message.id" 
                 class="message-item"
                 :class="{ 'message-mine': isSentByMe(message) }">
              
              <div class="message-avatar">
                <el-avatar 
                  :size="32" 
                  :src="message.sender_info.avatar_url" 
                />
              </div>
              <div class="message-content">
                <div class="message-time">
                  {{ formatTime(message.created_at) }}
                </div>
                <div class="message-bubble">
                  <!-- 文本消息 -->
                  <template v-if="message.message_type === 1">
                    {{ message.content }}
                  </template>
                  <!-- 图片消息 -->
                  <template v-else-if="message.message_type === 2">
                    <el-image 
                      :src="message.content"
                      :preview-src-list="[message.content]"
                      fit="cover"
                      class="message-image"
                    />
                  </template>
                </div>
              </div>
            </div>
          </el-scrollbar>
        </div>

        <!-- 输入区域 -->
        <div class="input-area">
          <div class="toolbar">
            <el-upload
              action="#"
              :auto-upload="false"
              :show-file-list="false"
              accept="image/*"
              @change="handleImageUpload"
            >
              <el-button :icon="Picture" circle />
            </el-upload>
          </div>
          <div class="input-box">
            <el-input
              v-model="newMessage"
              type="textarea"
              :rows="3"
              placeholder="输入消息..."
              :maxlength="500"
              show-word-limit
              resize="none"
              @keyup.enter.prevent="sendMessage"
            />
            <el-button 
              type="primary"
              :disabled="!newMessage.trim()"
              @click="sendMessage"
            >
              发送
            </el-button>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useLoginStore } from "@/stores/login"
import { ElMessage } from 'element-plus'
import { Picture } from '@element-plus/icons-vue'
import myAxios from "@/request"

const loginStore = useLoginStore()
const conversations = ref([])
const currentConversation = ref(null)
const messages = ref([])
const newMessage = ref('')
const messageList = ref(null)

// 获取当前用户ID
const getCurrentUserId = () => {
  const token = loginStore.data.token
  try {
    const payload = token.split('.')[1]
    const decoded = JSON.parse(atob(payload))
    return decoded.id
  } catch (error) {
    console.error('token解析失败:', error)
    return null
  }
}

// 获取会话列表
const getConversations = async () => {
  try {
    const response = await myAxios.get('/api/studentPersonalCenter/message/conversations')
    console.log('会话列表:', response.data)
    if (response.data.code === 0) {
      conversations.value = response.data.data
    }
  } catch (error) {
    console.error('获取会话列表失败:', error)
  }
}

// 获取会话消息
const getMessages = async (conversationId) => {
  try {
    const response = await myAxios.get(`/api/studentPersonalCenter/message/messages/${conversationId}`)
    console.log('获取到的消息数据:', response.data.data)
    if (response.data.code === 0) {
      messages.value = response.data.data.sort((a, b) => 
        new Date(a.created_at) - new Date(b.created_at)
      )
      // 打印每条消息的sender_info
      messages.value.forEach(msg => {
        console.log(`消息ID ${msg.id} 的发送者信息:`, msg.sender_info)
      })
      await nextTick()
      scrollToBottom()
    }
  } catch (error) {
    console.error('获取消息失败:', error)
  }
}

// 发送文本消息
const sendMessage = async () => {
  if (!newMessage.value.trim()) return
  
  try {
    const myId = getCurrentUserId()
    const receiverId = myId === currentConversation.value.user2_id ? 
                      currentConversation.value.user1_id : 
                      currentConversation.value.user2_id

    const response = await myAxios.post('/api/studentPersonalCenter/message/text', {
      receiver_id: receiverId,
      receiver_type: 'student',
      content: newMessage.value
    })
    
    if (response.data.code === 0) {
      newMessage.value = ''
      await getMessages(currentConversation.value.id)
      await getConversations()
    }
  } catch (error) {
    ElMessage.error('发送失败')
    console.error('发送消息失败:', error)
  }
}

// 处理图片上传
const handleImageUpload = async (file) => {
  if (file.size > 5 * 1024 * 1024) {
    ElMessage.error('图片大小不能超过5MB')
    return
  }

  const formData = new FormData()
  formData.append('image', file.raw)
  const myId = getCurrentUserId()
  const receiverId = myId === currentConversation.value.user2_id ? 
                    currentConversation.value.user1_id : 
                    currentConversation.value.user2_id
  
  formData.append('receiver_id', receiverId)
  formData.append('receiver_type', 'student')

  try {
    const response = await myAxios.post('/api/studentPersonalCenter/message/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    
    if (response.data.code === 0) {
      await getMessages(currentConversation.value.id)
      await getConversations()
      ElMessage.success('图片发送成功')
    } else {
      ElMessage.error(response.data.message || '发送图片失败')
    }
  } catch (error) {
    ElMessage.error('发送失败')
    console.error('发送图片失败:', error)
  }
}

// 选择会话
const selectConversation = (conversation) => {
  currentConversation.value = conversation
  getMessages(conversation.id)
}

// 判断消息是否由当前用户发送
const isSentByMe = (message) => {
  return message.sender_id === getCurrentUserId()
}

// 获取联系人名称
const getContactName = (conv) => {
  if (!conv) return ''
  const myId = getCurrentUserId()
  if (myId === conv.user1_id) {
    return conv.user2_info?.name || '未知用户'
  } else {
    return conv.user1_info?.name || '未知用户'
  }
}

// 获取联系人头像
const getContactAvatar = (conv) => {
  if (!conv) return ''
  const myId = getCurrentUserId()
  if (myId === conv.user1_id) {
    return conv.user2_info?.avatar_url
  } else {
    return conv.user1_info?.avatar_url
  }
}

// 格式化时间
const formatTime = (timestamp) => {
  if (!timestamp) return ''
  const date = new Date(timestamp)
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
}

// 滚动到底部
const scrollToBottom = () => {
  const scrollbar = messageList.value?.querySelector('.el-scrollbar__wrap')
  if (scrollbar) {
    scrollbar.scrollTop = scrollbar.scrollHeight
  }
}

let pollTimer = null  // 用于存储定时器ID

// 启动轮询
const startPolling = () => {
  pollTimer = setInterval(() => {
    if (currentConversation.value) {
      getMessages(currentConversation.value.id)
    }
    getConversations()
  }, 5000)
}

onMounted(() => {
  getConversations()
  startPolling()
})

onUnmounted(() => {
  if (pollTimer) {
    clearInterval(pollTimer)
  }
})
</script>

<style scoped>
.container {
  height: 100%;
  display: flex;
  background-color: #fff;
}

.contact-list {
  width: 260px;
  border-right: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
}

.section-title {
  padding: 16px;
  font-size: 14px;
  font-weight: 500;
  border-bottom: 1px solid #e0e0e0;
}

.contact-item {
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.contact-item:hover {
  background-color: #f5f5f5;
}

.contact-item.active {
  background-color: #e3f2fd;
}

.contact-info {
  flex: 1;
  min-width: 0;
}

.contact-name {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
}

.last-message {
  font-size: 12px;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.chat-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 100px); /* 调整高度 */
}

.no-contact {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chat-header {
  height: 60px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
}

.message-list {
  flex: 1;
  overflow: hidden;
}

.message-item {
  display: flex;
  gap: 12px;
  margin: 20px;
}

.message-mine {
  flex-direction: row-reverse;
}

.message-content {
  max-width: 70%;
}

.message-bubble {
  padding: 10px 16px;
  background-color: #f5f5f5;
  border-radius: 2px 8px 8px 8px;
  font-size: 14px;
  word-break: break-word;
}

.message-mine .message-bubble {
  background-color: #95ec69;
  border-radius: 8px 2px 8px 8px;
}

.message-time {
  font-size: 12px;
  color: #999;
  margin-bottom: 4px;
}

.toolbar {
  padding: 8px 12px;
  border-bottom: 1px solid #e0e0e0;
}

.input-area {
  padding: 0;
  border-top: 1px solid #e0e0e0;
}

.input-box {
  padding: 12px;
  display: flex;
  gap: 12px;
  align-items: flex-end;
}

.input-box .el-textarea {
  flex: 1;
}

.message-image {
  max-width: 200px;
  border-radius: 4px;
  cursor: pointer;
}

/* 修改滚动条样式 */
:deep(.el-scrollbar__wrap) {
  overflow-x: hidden;
}
</style>