import {mockNotificationPreferences,mockNotifications,mockStudentProfile} from "@/features/student-account/data/mock-account";
import type {ChangePasswordInput,MockAccountActionResult,NotificationPreferences,StudentNotificationsRepository,StudentProfileRepository,UpdateGuardianPreferencesInput,UpdateStudentProfileInput} from "@/features/student-account/types/account";
let profile={...mockStudentProfile};let preferences={...mockNotificationPreferences};let notices=[...mockNotifications];
export class MockStudentProfileRepository implements StudentProfileRepository {
  async getProfile(){return profile}
  async updateProfile(input:UpdateStudentProfileInput){profile={...profile,...input};return profile}
  async updateGuardianPreferences(input:UpdateGuardianPreferencesInput){const guardian=profile.guardian;if(!guardian)throw new Error("Guardian unavailable");const updated={...guardian,...input};profile={...profile,guardian:updated};return updated}
  async changePassword(input:ChangePasswordInput):Promise<MockAccountActionResult>{void input;return {success:true,message:"تمت محاكاة تغيير كلمة المرور لهذه الجلسة فقط."}}
}
export class MockStudentNotificationsRepository implements StudentNotificationsRepository {async getNotifications(){return notices}async getUnreadCount(){return notices.filter(item=>!item.isRead).length}async markAsRead(id:string){const item=notices.find(note=>note.id===id);if(!item)return null;item.isRead=true;item.readAt=new Date().toISOString();return item}async markAllAsRead(){notices=notices.map(item=>({...item,isRead:true,readAt:item.readAt??new Date().toISOString()}));return notices}async getPreferences(){return preferences}async updatePreferences(input:NotificationPreferences){preferences={...input};return preferences}}
