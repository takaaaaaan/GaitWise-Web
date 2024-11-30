import mongoose from 'mongoose'
import { NextRequest, NextResponse } from 'next/server'

import { dbConnect } from '@/db/models'
import User from '@/db/models/user'

// POST request to fetch user data by participantId
export async function POST(req: NextRequest) {
  try {
    // Connect to the database
    await dbConnect()

    const { participantId } = await req.json()

    if (!participantId || !mongoose.Types.ObjectId.isValid(participantId)) {
      return NextResponse.json({ success: false, message: 'Invalid or missing participantId' }, { status: 400 })
    }

    const user = await User.findById(participantId)
      .populate('projects')
      .populate('surveys')
      .populate('walking_history')
      .exec()

    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: user })
  } catch (error) {
    console.error('Error fetching user data:', error)
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 })
  }
}
