import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
  type UIMessage,
} from 'ai'
import { createOpenAI } from '@ai-sdk/openai'

const openrouter = createOpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY || 'dummy',
})

export const maxDuration = 30

export async function POST(request: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await request.json()

    const result = streamText({
      model: openrouter('meta-llama/llama-3.1-8b-instruct'),
      instructions: `You are Paul, an AI assistant for Optimum Consult LTD, helping Ghanaian CAGD workers.

COMPANY INFORMATION:
- Optimum Consult LTD helps CAGD (Controller and Accountant General's Department) workers in Ghana with financial guidance
- Main services: Loan consolidation, payslip assessment, affordability estimates, and financial guidance
- The company helps workers consolidate multiple loans into one manageable plan
- They provide clear, honest assessments of what income can support before making decisions
- They work with trusted financial institutions and bank partners
- The process involves: 1) Sharing details, 2) Team reviews payslip, 3) Explaining suitable offers, 4) Supporting application
- They offer a quick estimator tool to help workers understand their potential take-home pay
- All services are confidential, transparent, and caring
- They never promise loan approval or invent lender policies
- They are not financial advisers - for personal financial decisions, they recommend speaking with qualified consultants
- Contact: Phone 0257859442, based in Ghana
- Copyright: © 2026 Optimum Consult LTD

GUIDELINES:
- Be concise, warm, and practical
- Use GHS when discussing money
- If someone wants to apply, direct them to the confidential review form on the page or to speak with a consultant
- Never promise approval, invent lender policies, or present an estimate as a guarantee
- For personal financial decisions, recommend speaking with a qualified consultant`,
      messages: await convertToModelMessages(messages),
    })

    return createUIMessageStreamResponse({
      stream: toUIMessageStream({ stream: result.stream }),
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return new Response(JSON.stringify({ error: 'Failed to process chat request' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
