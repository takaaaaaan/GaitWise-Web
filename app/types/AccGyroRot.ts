// ====== Acc Gyro Rot

export type Acc = {
  _id: string // MongoDB ObjectId
  accX: number[] // X축 방향의 가속도 데이터
  accY: number[] // Y축 방향의 가속도 데이터
  accZ: number[] // Z축 방향의 가속도 데이터
  createdAt: Date // 데이터 생성 날짜
  updatedAt: Date // 데이터 갱신 날짜
}

export type Gyro = {
  _id: string // MongoDB ObjectId
  gyroX: number[] // X축 방향의 자이로스코프 데이터
  gyroY: number[] // Y축 방향의 자이로스코프 데이터
  gyroZ: number[] // Z축 방향의 자이로스코프 데이터
  createdAt: Date // 데이터 생성 날짜
  updatedAt: Date // 데이터 갱신 날짜
}

export type Rot = {
  _id: string // MongoDB ObjectId
  rotX: number[] // X축 방향의 회전 데이터
  rotY: number[] // Y축 방향의 회전 데이터
  rotZ: number[] // Z축 방향의 회전 데이터
  createdAt: Date // 데이터 생성 날짜
  updatedAt: Date // 데이터 갱신 날짜
}

// ====== ResponseData Type

export type ResponseData = {
  acc: {
    accX: number[] // 트림된 X축 방향의 가속도 데이터
    accY: number[] // 트림된 Y축 방향의 가속도 데이터
    accZ: number[] // 트림된 Z축 방향의 가속도 데이터
  }
  gyro: {
    gyroX: number[] // 트림된 X축 방향의 자이로스코프 데이터
    gyroY: number[] // 트림된 Y축 방향의 자이로스코프 데이터
    gyroZ: number[] // 트림된 Z축 방향의 자이로스코프 데이터
  }
  rot: {
    rotX: number[] // 트림된 X축 방향의 회전 데이터
    rotY: number[] // 트림된 Y축 방향의 회전 데이터
    rotZ: number[] // 트림된 Z축 방향의 회전 데이터
  }
  event_time: number[] // 트림된 이벤트 타임 데이터
  walking_time: number // 걸음 시간
  step_count: number // 걸음 수
}
