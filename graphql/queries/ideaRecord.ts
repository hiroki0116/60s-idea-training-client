import { gql } from '@apollo/client';

export const GET_MOST_RECENT_IDEA_RECORDS = gql`
    query IdeaRecord{
        getMostRecentIdeaRecords {
            _id
            topicTitle
            category
            ideas
            createdAt
        }
    }
`

