package com.mycompany.tennis.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.tennis.web.rest.TestUtil;

public class CourtTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Court.class);
        Court court1 = new Court();
        court1.setId(1L);
        Court court2 = new Court();
        court2.setId(court1.getId());
        assertThat(court1).isEqualTo(court2);
        court2.setId(2L);
        assertThat(court1).isNotEqualTo(court2);
        court1.setId(null);
        assertThat(court1).isNotEqualTo(court2);
    }
}
