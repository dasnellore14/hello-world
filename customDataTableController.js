({
	doInit : function(component, event, helper) {
		// Making a call to Apex method to fetch the account records. 
		var action = component.get("c.fetchAccounts");
        
		//Defining the callback function
        action.setCallback(this, function(response) {
            var state = response.getState();
            if(state === "SUCCESS"){
                component.set( "v.allAccounts", response.getReturnValue());
            }
            else if(state === "INCOMPLETE"){
        
            }
            else if(state === "ERROR"){
                var errors = response.getError();
                if(errors){
                    if(errors[0] && errors[0].message){
                        console.log("Error message: " + errors[0].message);
                    }
                }else{
                    console.log("Unknown error");
                }
            }
        });
		//Adding the request to queue
        $A.enqueueAction(action);    
	}
})
