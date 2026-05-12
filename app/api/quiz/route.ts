import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, data } = body

    if (action === 'insert_quiz_response') {
      const { data: result, error } = await supabase
        .from('quiz_responses')
        .insert(data)
        .select('id')
        .single()

      if (error) {
        console.error('Supabase error:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
      }

      return NextResponse.json({ id: result.id })
    }

    if (action === 'update_quiz_response') {
      const { id, ...updateData } = data
      const { error } = await supabase
        .from('quiz_responses')
        .update(updateData)
        .eq('id', id)

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
      }

      return NextResponse.json({ success: true })
    }

    if (action === 'insert_lead') {
      const { error } = await supabase
        .from('leads')
        .insert(data)

      if (error) {
        if (error.code === '23505') {
          return NextResponse.json({ already_exists: true })
        }
        return NextResponse.json({ error: error.message }, { status: 500 })
      }

      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })

  } catch (error) {
    console.error('API route error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
