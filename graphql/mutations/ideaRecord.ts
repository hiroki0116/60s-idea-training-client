import { gql } from '@apollo/client';

export const CREATE_NEW_IDEA_RECORD = gql`
  mutation CreateNewIdeaRecord($topicTitle: String, $category: String, $ideas: [String]) {
    createNewIdeaRecord(topicTitle: $topicTitle, category: $category, ideas: $ideas){
        _id
        topicTitle
        category	
        ideas
    }
  }
`;
