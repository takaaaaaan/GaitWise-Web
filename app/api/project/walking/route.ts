import mongoose from 'mongoose'
import { NextRequest, NextResponse } from 'next/server'

import { dbConnect } from '@/db/models'
import WalkingHistory from '@/db/models/walking' // Ensure WalkingHistory model is imported

// POST request to fetch specific walking history by walkingId
export async function POST(req: NextRequest) {
  try {
    // Connect to the database
    await dbConnect()

    // Parse and validate walkingId from request body
    const { walkingId } = await req.json()
    if (!walkingId || !mongoose.Types.ObjectId.isValid(walkingId)) {
      return NextResponse.json({ success: false, message: 'Invalid or missing walkingId' }, { status: 400 })
    }

    // Query walking history data and populate fields
    const walkingData = await WalkingHistory.findById(walkingId)
      .populate('acc')
      .populate('gyro')
      .populate('rot')
      .select('acc gyro rot walking_time event_time step_count createdAt')

    if (!walkingData) {
      return NextResponse.json({ success: false, message: 'Walking history not found' }, { status: 404 })
    }

    // Format the response data
    const responseData = {
      acc: walkingData.acc,
      gyro: walkingData.gyro,
      rot: walkingData.rot,
      walking_time: walkingData.walking_time,
      event_time: walkingData.event_time,
      step_count: walkingData.step_count,
      createdAt: walkingData.createdAt,
    }

    return NextResponse.json({ success: true, data: responseData })
  } catch (error) {
    console.error('Error fetching walking data:', error)
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 })
  }
}
