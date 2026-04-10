package com.schemeengine.backend.rules;

import com.schemeengine.backend.entity.SchemeRule;
import com.schemeengine.backend.entity.UserProfile;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EligibilityService {

    public boolean isEligible(UserProfile profile, List<SchemeRule> rules) {

        for (SchemeRule rule : rules) {

            Object userValue = getFieldValue(profile, rule.getFieldName());

            if (!evaluate(userValue, rule.getOperator(), rule.getValue())) {
                return false;
            }
        }
        return true;
    }

    private Object getFieldValue(UserProfile profile, String field) {
        return switch (field) {
            case "income" -> profile.getIncome();
            case "caste" -> profile.getCaste();
            case "age" -> profile.getAge();
            case "state" -> profile.getState();
            default -> null;
        };
    }

    private boolean evaluate(Object userValue, String operator, String value) {

        if (userValue == null) return false;

        switch (operator) {

            case "<":
                return Double.parseDouble(userValue.toString()) < Double.parseDouble(value);

            case ">":
                return Double.parseDouble(userValue.toString()) > Double.parseDouble(value);

            case "=":
                return userValue.toString().equalsIgnoreCase(value);

            case "IN":
                return value.contains(userValue.toString());

            default:
                return false;
        }
    }
}
