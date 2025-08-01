import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageSquare, Share2, ThumbsUp, Reply } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface InteractionFeaturesProps {
  contentId: string;
  contentType: "note" | "lecture" | "live";
  initialLikes?: number;
  initialComments?: number;
}

export const InteractionFeatures = ({ 
  contentId, 
  contentType, 
  initialLikes = 0, 
  initialComments = 0 
}: InteractionFeaturesProps) => {
  const { toast } = useToast();
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([
    {
      id: 1,
      user: "Priya Singh",
      avatar: "/placeholder.svg",
      comment: "This explanation is really helpful! Thank you for sharing.",
      time: "2 hours ago",
      likes: 3,
      replies: []
    },
    {
      id: 2,
      user: "Amit Sharma",
      avatar: "/placeholder.svg",
      comment: "Could you explain the second example in more detail?",
      time: "1 day ago",
      likes: 1,
      replies: [
        {
          id: 3,
          user: "Dr. Amit Kumar",
          avatar: "/placeholder.svg",
          comment: "Sure! I'll create a detailed video on that topic.",
          time: "1 day ago",
          likes: 2
        }
      ]
    }
  ]);

  const handleLike = () => {
    setLiked(!liked);
    setLikes(prev => liked ? prev - 1 : prev + 1);
    toast({
      title: liked ? "Removed like" : "Liked!",
      description: `You ${liked ? "removed your like from" : "liked"} this ${contentType}.`,
    });
  };

  const handleComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        user: "You",
        avatar: "/placeholder.svg",
        comment: newComment,
        time: "Just now",
        likes: 0,
        replies: []
      };
      setComments([comment, ...comments]);
      setNewComment("");
      toast({
        title: "Comment added!",
        description: "Your comment has been posted successfully.",
      });
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied!",
      description: "Content link has been copied to clipboard.",
    });
  };

  return (
    <div className="space-y-4">
      {/* Interaction Buttons */}
      <div className="flex items-center gap-4 p-4 border rounded-lg bg-card">
        <Button
          variant={liked ? "default" : "outline"}
          size="sm"
          onClick={handleLike}
          className="gap-2"
        >
          <Heart className={`w-4 h-4 ${liked ? "fill-red-500 text-red-500" : ""}`} />
          {likes}
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowComments(!showComments)}
          className="gap-2"
        >
          <MessageSquare className="w-4 h-4" />
          {comments.length}
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={handleShare}
          className="gap-2"
        >
          <Share2 className="w-4 h-4" />
          Share
        </Button>

        <Badge variant="secondary" className="ml-auto">
          {contentType === "note" ? "Study Notes" : 
           contentType === "lecture" ? "Recorded Lecture" : "Live Class"}
        </Badge>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="space-y-4 p-4 border rounded-lg bg-card">
          <h4 className="font-semibold">Comments ({comments.length})</h4>
          
          {/* Add Comment */}
          <div className="space-y-2">
            <Textarea
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={3}
            />
            <Button onClick={handleComment} disabled={!newComment.trim()}>
              Post Comment
            </Button>
          </div>

          {/* Comments List */}
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="space-y-2">
                <div className="flex items-start gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={comment.avatar} alt={comment.user} />
                    <AvatarFallback>{comment.user[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{comment.user}</span>
                      <span className="text-xs text-muted-foreground">{comment.time}</span>
                    </div>
                    <p className="text-sm">{comment.comment}</p>
                    <div className="flex items-center gap-4">
                      <Button variant="ghost" size="sm" className="gap-1 h-auto p-1">
                        <ThumbsUp className="w-3 h-3" />
                        {comment.likes}
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-1 h-auto p-1">
                        <Reply className="w-3 h-3" />
                        Reply
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Replies */}
                {comment.replies && comment.replies.length > 0 && (
                  <div className="ml-11 space-y-2">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="flex items-start gap-3">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={reply.avatar} alt={reply.user} />
                          <AvatarFallback>{reply.user[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-xs">{reply.user}</span>
                            <span className="text-xs text-muted-foreground">{reply.time}</span>
                          </div>
                          <p className="text-xs">{reply.comment}</p>
                          <Button variant="ghost" size="sm" className="gap-1 h-auto p-1">
                            <ThumbsUp className="w-3 h-3" />
                            {reply.likes}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};