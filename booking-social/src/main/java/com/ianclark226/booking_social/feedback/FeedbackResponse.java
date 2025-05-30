package com.ianclark226.booking_social.feedback;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FeedbackResponse {

    private Integer note;
    private String comment;
    private boolean ownFeedback;
}
