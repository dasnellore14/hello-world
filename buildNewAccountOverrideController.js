({
    doInit : function(component, event, helper) {
        helper.toggleTwoAndThreeSteps(component);
        component.set("v.progressIndicatorFlag", "step1");
    },
    goToStepTwo : function(component, event, helper) {
        helper.toggleOneAndTwoSteps(component);
        component.set("v.progressIndicatorFlag", "step2");
    },
    goToStepThree : function(component, event, helper) {
        helper.toggleTwoAndThreeSteps(component);
        component.set("v.progressIndicatorFlag", "step3");
    },
    goBackToStepOne : function(component, event, helper) {
        helper.toggleOneAndTwoSteps(component);
        component.set("v.progressIndicatorFlag", "step1");
    },
    goBackToStepTwo : function(component, event, helper) {
        helper.toggleTwoAndThreeSteps(component);
        component.set("v.progressIndicatorFlag", "step2");
    },
    handleSuccess : function(component, event, helper) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": "Success!",
            "message": "The record has been updated successfully."
        });
        toastEvent.fire();
    }
})
