const { gql } = require('apollo-server');

module.exports = gql`

enum NotificationType {
    LIKE
    FOLLOW
    COMMENT
  }
  enum NotificationOperationType {
    CREATE
    DELETE
  }

  type Notification {
    id: ID!
    user: User
    author: User
    post: ID!
    follow: Follow
    type: NotificationType
    seen: Boolean
    createdAt: String
  }
  type NotificationPayload {
    id: ID
    user: UserPayload
    author: UserPayload
    follow: Follow
    createdAt: String
  }
  type NotificationsPayload {
    count: String!
    notifications: [NotificationPayload]!
  }
  type NotificationCreatedOrDeletedPayload {
    operation: NotificationOperationType!
    notification: NotificationPayload
  }
  input CreateNotificationInput {
    userId: ID!
    authorId: ID!
    postId: ID
    notificationType: NotificationType!
    notificationTypeId: ID
  }
  input DeleteNotificationInput {
    id: ID!
  }

  type Query {
    getUserNotifications(userId: ID!): NotificationsPayload
    }
  type Mutation {
    createNotification(input: CreateNotificationInput!): Notification
    deleteNotification(input: DeleteNotificationInput!): Notification
}
type Subscription {
    notificationCreatedOrDeleted: NotificationCreatedOrDeletedPayload

}

`