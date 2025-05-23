import { createClient } from '@supabase/supabase-js';

// Theme management
function initTheme() {
  const theme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', theme);
  return theme;
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
}

// Supabase initialization
function initSupabase() {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase configuration is missing. Please check your .env file.');
  }

  try {
    // Validate URL format
    new URL(supabaseUrl);
    return createClient(supabaseUrl, supabaseKey);
  } catch (error) {
    throw new Error(`Invalid Supabase URL: ${error.message}`);
  }
}

const supabase = initSupabase();
let currentChatId = null;
let currentDoctor = null;

// Initialize theme when the script loads
initTheme();

// Add theme toggle button to the UI
function addThemeToggle() {
  const header = document.querySelector('.chat-header') || document.body;
  const toggleButton = document.createElement('button');
  toggleButton.className = 'theme-toggle';
  toggleButton.innerHTML = '🌓';
  toggleButton.onclick = toggleTheme;
  header.appendChild(toggleButton);
}

export async function initChat(doctorId) {
  try {
    currentDoctor = doctorId;
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      alert('Por favor, faça login para iniciar um chat');
      return;
    }

    const { data: chat, error } = await supabase
      .from('chats')
      .insert({
        patient_id: user.id,
        doctor_id: doctorId,
        status: 'pending'
      })
      .select()
      .single();

    if (error) throw error;

    currentChatId = chat.id;
    addThemeToggle();
    await loadChatHistory();
    setupChatListeners();
  } catch (error) {
    console.error('Error initializing chat:', error);
    alert('Erro ao iniciar o chat. Por favor, tente novamente.');
  }
}

async function loadChatHistory() {
  try {
    const { data: messages, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('chat_id', currentChatId)
      .order('created_at');

    if (error) throw error;

    const chatMessages = document.querySelector('.chat-messages');
    chatMessages.innerHTML = '';
    
    messages?.forEach(message => {
      addMessageToChat(message);
    });
  } catch (error) {
    console.error('Error loading chat history:', error);
  }
}

function addMessageToChat(message) {
  const chatMessages = document.querySelector('.chat-messages');
  const messageElement = document.createElement('div');
  messageElement.className = `chat-message ${message.is_doctor ? 'doctor' : 'patient'}`;
  
  messageElement.innerHTML = `
    <div class="message-content">
      <span class="message-sender">${message.is_doctor ? 'Médico' : 'Você'}</span>
      <p>${message.content}</p>
      <span class="message-time">${new Date(message.created_at).toLocaleTimeString()}</span>
    </div>
  `;
  
  chatMessages.appendChild(messageElement);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function setupChatListeners() {
  const messageForm = document.querySelector('.chat-input-form');
  const messageInput = document.querySelector('.chat-input');

  messageForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const content = messageInput.value.trim();
    
    if (!content) return;

    try {
      const { data: message, error } = await supabase
        .from('chat_messages')
        .insert({
          chat_id: currentChatId,
          content,
          is_doctor: false
        })
        .select()
        .single();

      if (error) throw error;

      addMessageToChat(message);
      messageInput.value = '';
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Erro ao enviar mensagem. Por favor, tente novamente.');
    }
  });

  // Real-time updates for new messages
  supabase
    .channel('chat_messages')
    .on('postgres_changes', {
      event: 'INSERT',
      schema: 'public',
      table: 'chat_messages',
      filter: `chat_id=eq.${currentChatId}`
    }, payload => {
      if (payload.new.is_doctor) {
        addMessageToChat(payload.new);
      }
    })
    .subscribe();
}