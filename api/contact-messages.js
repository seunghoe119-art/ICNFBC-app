// 연락처 메시지를 처리하는 함수
import { createClient } from '@supabase/supabase-js'

// Supabase 연결 설정
const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export default async function handler(req, res) {
  // CORS 설정 (다른 도메인에서 접근 허용)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  try {
    if (req.method === 'POST') {
      // 새로운 연락처 메시지 받기
      const messageData = req.body
      
      const { data, error } = await supabase
        .from('contact_messages')
        .insert([{
          name: messageData.name,
          email: messageData.email,
          message: messageData.message,
          created_at: new Date()
        }])
        .select()

      if (error) throw error

      res.json({ success: true, message: data[0] })
    } 
    else if (req.method === 'GET') {
      // 모든 연락처 메시지 보기 (관리자용)
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      res.json(data)
    } 
    else {
      res.status(405).json({ error: '지원하지 않는 요청입니다' })
    }
  } catch (error) {
    console.error('에러 발생:', error)
    res.status(400).json({ error: error.message })
  }
}