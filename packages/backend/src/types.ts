export const notificationTypes = ['follow', 'mention', 'reply', 'renote', 'quote', 'reaction', 'pollVote', 'pollEnded', 'receiveFollowRequest', 'followRequestAccepted', 'groupInvited', 'app'] as const;

// notifications that are related to a specific note
export const noteNotificationTypes = ['mention', 'reply', 'renote', 'quote', 'reaction', 'pollVote', 'pollEnded'] as const;

export const noteVisibilities = ['public', 'home', 'followers', 'specified'] as const;

export const mutedNoteReasons = ['word', 'manual', 'spam', 'other'] as const;

export const ffVisibility = ['public', 'followers', 'private'] as const;
