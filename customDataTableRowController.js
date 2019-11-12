({
    doInit : function(component, event, helper) {

        //Making a call to the Apex method to fetch the values of Rating field
        var action = component.get("c.fetchRatingValues");

        //Getting the value of Rating field for a particular record from Component
        var rating = component.get(' v.account.Rating');
        
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                
                console.log(' 💥 ' + response.getReturnValue());
                var allRatingValues = response.getReturnValue();
                
                /** We need to form a JSON object like this to pass it to 
                <lightning:select /> tag */

                /** var serverResponse = {
                    selectedColorId: 2,
                    colors: [
                        { id: 1, label: 'Red' },
                        { id: 2, label: 'Green', selected: true },
                        { id: 3, label: 'Blue' }
                    ]
                    };                
                */

                var ratingId;
                var ratingOptions = [];
                
                for(var i=0; i< allRatingValues.length; i++){
                    
                    if(i == 0){
                        
                        /** We need to make sure the first value of the Picklist
                        is always None */

                        if(rating != undefined){
                            ratingOptions.push({
                                id: 0, 
                                label: '--None--'
                            });
                            
                        }else{
                            ratingOptions.push({
                                id: 0, 
                                label: '--None--',
                                selected: true
                            });
                            ratingId = 0;
                            
                        }
                        
                    }
                    
                    /** Am trying to compare the Rating field value with the list
                    that we get back from the Apex method and when there is a match
                    am adding selected: true to the JSON Object. */

                    if(allRatingValues[i] == rating){
                        ratingOptions.push({
                            id: i+1, 
                            label: allRatingValues[i],
                            selected: true 
                        });
                        ratingId = i+1;
                    }else{
                        ratingOptions.push({
                            id: i+1, 
                            label: allRatingValues[i]
                        });
                    }
                }
                
                console.log(' 💥 ' + JSON.stringify(ratingOptions));
                
                var serverResponse = {
                    selectedRatingId: ratingId,
                    rating: ratingOptions
                };
                
                component.set( "v.options", serverResponse.rating);
                component.set( "v.selectedValue", serverResponse.selectedRatingId);
            }
            else if(state === "INCOMPLETE"){
                
            }
            else if(state === "ERROR"){
                var errors = response.getError();
                if(errors){
                    if(errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message);
                    }
                }else{
                    console.log("Unknown error");
                }
            }
        });
        
        
        $A.enqueueAction(action);
        
    }
})
