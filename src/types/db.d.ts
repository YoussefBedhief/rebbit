import { Comment, Post, Subrebbit, User, Vote } from "@prisma/client"

export type ExtendedPost = Post & {
  subrebbit: Subrebbit
  votes: Vote[]
  author: User
  comments: Comment[]
}
