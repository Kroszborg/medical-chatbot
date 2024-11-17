import { Configuration, OpenAIApi } from 'openai-edge'
import { OpenAIStream, StreamingTextResponse } from 'ai'

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(config)

export const runtime = 'edge'

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not set')
    }

    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      stream: true,
      messages: [
        {
          role: 'system',
          content: 'You are a helpful medical AI assistant. Provide accurate and helpful information, but always advise users to consult with a real doctor for proper medical advice and treatment.'
        },
        ...messages
      ]
    })

    const stream = OpenAIStream(response)
    return new StreamingTextResponse(stream)
  } catch (error: unknown) {
    console.error('OpenAI API error:', error)
    if (error instanceof Error && error.message === 'OPENAI_API_KEY is not set') {
      return new Response(JSON.stringify({ error: 'OpenAI API key is not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      })
    }
    if (error instanceof Error && error.message.includes('insufficient_quota')) {
      return new Response(JSON.stringify({ error: 'OpenAI API quota exceeded. Please check your plan and billing details.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      })
    }
    return new Response(JSON.stringify({ error: 'An error occurred while processing your request.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}