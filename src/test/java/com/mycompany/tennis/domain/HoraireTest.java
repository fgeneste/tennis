package com.mycompany.tennis.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.tennis.web.rest.TestUtil;

public class HoraireTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Horaire.class);
        Horaire horaire1 = new Horaire();
        horaire1.setId(1L);
        Horaire horaire2 = new Horaire();
        horaire2.setId(horaire1.getId());
        assertThat(horaire1).isEqualTo(horaire2);
        horaire2.setId(2L);
        assertThat(horaire1).isNotEqualTo(horaire2);
        horaire1.setId(null);
        assertThat(horaire1).isNotEqualTo(horaire2);
    }
}
