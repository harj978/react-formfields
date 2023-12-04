import React, {Fragment, useRef} from "react";
import Select from 'react-select';
import DatePicker from "react-datepicker";
import format from 'date-fns/format'
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/* Datepicker from https://reactdatepicker.com/
 * Usage example: https://codinghelp.io/complete-react-datepicker-tutorial-with-examples/
 * 
 */


const TextField = (propsIn) => {
    

    /* Disable/Enable rules
     * 
     * if enableField=false then all fields are disabled irrespective of any other disabled settings. This is a screen wide setting ie effects all fields
     * if enableField=true and disabled=true then FIELD will be disabled. disabled is a field setting 
     * if enableField=true and disabled=false then disableON will take over. disableON works with Modification Action ie ADD or UPDATE 

     */
    
    
    /* ref in the fields is like html id. It cannot be a string so we default it to a dummy userRef so React wont complain if "ref" prop has not been sent in*/
    const dummyRef = useRef(null);
    
    let enableField=true;
    let name="";
    let type="";
    let ref="";
    let value="";
    let icon="";  // icon for buttons. If set react button will transform to an icon
    let iconColour="green";
    let iconSize="lg";     // this is lg, md or sm
    let iconFasFar="fas";   // this is fas or far
    let displayValue="";
    let lookupData=[];
    let lookupDataField="";
    let label="";
    let id="";
    let placeholder="";
    let hoverMessage="";
    let handleEditFormChange;
    let handleonBlur;
    let handleEditSelectChange;
    let handleDatePick;
    let handleButtonClick;
    let ddData=[];
    let ddDataMulti=[];
    let disableOn="";
    let disabled=false;
    let readOnly=false;
    let modifyAction="";
    let checked=false;
    let radioValue="";
    let step=0;
    let fieldClass="";
    let checkboxClass="";
    let checkboxLabelClass="";
    let checkboxLabelPos="RIGHT";
    let checkboxLabelRIGHT="";
    let checkboxLabelLEFT="";
    let fromElement="";
    let buttonClass="btn btn-success active";       /* class applied to each button */
    let iconClass="btn-lg active";       /* class applied to each button  icon */
    let minDate=new Date("1970/01/01");
    let dateFormat="dd/MM/yyyy";
    let style={borderColor:'grey',width:'100%',height:'35px'};
    let defaultIntStyle={width: "75px",height:"40px",color:"black",backgroundColor:"white"}
    let buttonStyle={};
    let nativeDisplay=false;
    let nativeStyle={borderColor:'grey',width:'100%',height:'35px'};
    let useIcon=false;
    let defaultRadioStyle={marginLeft:'10px'};
    
    /* following are for react-select single select */
    let isLoading=false;
    let isClearable=false;
    let isRtl=false;
    let isSearchable=false;
    
    /* following is for calendar */
    let calendarOpen=false;
                            
    
    let debug=false;
    
    if (propsIn.fromElement!==undefined){
        fromElement=propsIn.fromElement;
    }
    
    if (propsIn.debug!==undefined){
        debug=propsIn.debug;
    } 
    
    /* FormField could be called outside the creation of a browse line.
     * If browsline then we will have all details in propsIn.rowLine.
     * if not then details will just be passed in for the element being created
     */
    
    
    if (propsIn.name!==undefined){
        name=propsIn.name;
    } 
    
    if (propsIn.ref!==undefined){
        ref=propsIn.ref;
    } 
    else{
        ref=dummyRef;
    }
    
    if (propsIn.type!==undefined){
        type=propsIn.type;
    }
    
    if (propsIn.id!==undefined){
        id=propsIn.id;
    }
    
    if (propsIn.value!==undefined){
        value=propsIn.value;
    }
    
    if (propsIn.fieldClass!==undefined){
        fieldClass= propsIn.fieldClass;
    }
    
    if (propsIn.checkboxClass!==undefined){
        checkboxClass= propsIn.checkboxClass;
    }
    
    if (propsIn.checkboxLabelClass!==undefined){
        checkboxLabelClass= propsIn.checkboxLabelClass;
    }
    
    if (propsIn.checkboxLabelPos!==undefined){
        checkboxLabelPos= propsIn.checkboxLabelPos.toUpperCase();;
    }
    
    if (propsIn.placeholder!==undefined){
        placeholder= propsIn.placeholder;
    }
    
    if (propsIn.hoverMessage!==undefined){
        hoverMessage= propsIn.hoverMessage;
    }
    
    if (propsIn.label!==undefined){
        label=propsIn.label;
    }
    
    if (propsIn.style!==undefined){
        style=propsIn.style;
    }
    else if (type==="button"){
        style=buttonStyle;
    }
    else if (type==="radio"){
        style=defaultRadioStyle;
    }
    else if (type==="integer" || type==="decimal"){
        style=defaultIntStyle;
    }
    
    
    if (propsIn.icon!==undefined && propsIn.icon!==""){ 
        icon=propsIn.icon;
        useIcon=true;
    }
    if (propsIn.iconColour!==undefined && propsIn.iconColour!==""){ 
        iconColour=propsIn.iconColour;
    }
    if (propsIn.iconSize!==undefined && propsIn.iconSize!==""){ 
        iconSize=propsIn.iconSize;
    }
    if (propsIn.iconFasFar!==undefined && propsIn.iconFasFar!==""){ 
        iconFasFar=propsIn.iconFasFar;
    }
    
    
    
    if (propsIn.enableField!==undefined){
        enableField=propsIn.enableField;
    } 
    
    if (propsIn.radioValue!==undefined){
        radioValue=propsIn.radioValue;
    }
    
    if (propsIn.lookupData!==undefined){
        lookupData=propsIn.lookupData;
    }
    
    if (propsIn.lookupDataField!==undefined){
        lookupDataField=propsIn.lookupDataField;
    }
    
    /* this buttonClass can be over-written by buttonClass on individual buttons. That would come through as propsIn.rowLine.buttonClass */
    if (propsIn.buttonClass!==undefined){
        buttonClass=propsIn.buttonClass;
    }
    
    if (propsIn.iconClass!==undefined){
        iconClass=propsIn.iconClass;
    }
    
    if (propsIn.dateFormat!==undefined){
        dateFormat=propsIn.dateFormat;
    }
    
    if (propsIn.nativeDisplay!==undefined){
        nativeDisplay=propsIn.nativeDisplay;
    }
    
    if (propsIn.nativeStyle!==undefined){
        nativeStyle=propsIn.nativeStyle;
    }
    
    if (propsIn.displayValue!==undefined){
        displayValue=propsIn.displayValue;
    }
    else{
        displayValue=value;
    }
    
    if (propsIn.searchable!==undefined){
        isSearchable=propsIn.searchable;
    }
    
    if (propsIn.step!==undefined){
        step=propsIn.step;
    }
    
    if (propsIn.minDate!==undefined){
        minDate=propsIn.minDate;
    }
    
    /* data line can have two elements in one object ie name and name2. fromElement distnguishes then */
    if (fromElement==="" && propsIn.rowLine!==undefined){
        if (propsIn.rowLine.name!==undefined){
            name=propsIn.rowLine.name;
        }
        if (propsIn.rowLine.ref!==undefined){
            ref=propsIn.rowLine.ref;
        }
        else{
            ref=dummyRef;
        }
        if (propsIn.rowLine.type!==undefined){
            type=propsIn.rowLine.type;
        }
        if (propsIn.rowLine.value!==undefined){
            value=propsIn.rowLine.value;
        }
        
        if (propsIn.rowLine.displayValue!==undefined){
            displayValue=propsIn.rowLine.displayValue;
        }
        else{
            displayValue=value;
        }
        
        if (propsIn.rowLine.label!==undefined){
            label= propsIn.rowLine.label;
        }

        if (propsIn.rowLine.id!==undefined){
            id= propsIn.rowLine.id;
        }


        if (propsIn.rowLine.lookupDataField!==undefined){
            lookupDataField=propsIn.rowLine.lookupDataField;
        }
        
        if (propsIn.rowLine.disableOn!==undefined){
            disableOn= propsIn.rowLine.disableOn;

        }

        if (propsIn.rowLine.disabled!==undefined){
            disabled= propsIn.rowLine.disabled;
        }

        if (propsIn.rowLine.readOnly!==undefined){
            readOnly= propsIn.rowLine.readOnly;
        }

        if (propsIn.rowLine.fieldClass!==undefined){
            fieldClass= propsIn.rowLine.fieldClass;
        }

        if (propsIn.rowLine.checkboxClass!==undefined){
            checkboxClass= propsIn.rowLine.checkboxClass;
        }

        if (propsIn.rowLine.checkboxLabelClass!==undefined){
            checkboxLabelClass= propsIn.rowLine.checkboxLabelClass;
        }
        
        if (propsIn.rowLine.checkboxLabelPos!==undefined){
            checkboxLabelPos= propsIn.rowLine.checkboxLabelPos.toUpperCase();;
        }

        if (propsIn.rowLine.placeholder!==undefined){
            placeholder= propsIn.rowLine.placeholder;
        }
        
        if (propsIn.rowLine.hoverMessage!==undefined){
            hoverMessage= propsIn.rowLine.hoverMessage;
        }
        
        if (propsIn.rowLine.step!==undefined){
            step=propsIn.rowLine.step;
        } 
        
        if (propsIn.rowLine.buttonClass!==undefined){
            buttonClass=propsIn.rowLine.buttonClass;
        }
        
        if (propsIn.rowLine.iconClass!==undefined){
            iconClass=propsIn.rowLine.iconClass;
        }
        
        if (propsIn.rowLine.minDate!==undefined){
            minDate=propsIn.rowLine.minDate;
        }
        
        if (propsIn.rowLine.style!==undefined){
            style=propsIn.rowLine.style;
        }
        
        
        /* native for whoel screen can be over-ridden by field level settings */
        if (propsIn.rowLine.nativeDisplay!==undefined){
            nativeDisplay=propsIn.rowLine.nativeDisplay;
        }
        if (propsIn.rowLine.nativeStyle!==undefined){
            nativeStyle=propsIn.rowLine.nativeStyle;
        }
        if (propsIn.rowLine.searchable!==undefined){
            isSearchable=propsIn.rowLine.searchable;
        }
        if (propsIn.rowLine.icon!==undefined){ 
            icon=propsIn.rowLine.icon;
            useIcon=true;
        }
        if (propsIn.rowLine.iconColour!==undefined){ 
            iconColour=propsIn.rowLine.iconColour;
        }
        if (propsIn.rowLine.iconSize!==undefined){ 
            iconSize=propsIn.rowLine.iconSize;
        }
        if (propsIn.rowLine.iconFasFar!==undefined){ 
            iconFasFar=propsIn.rowLine.iconFasFar;
        }
        
        if (propsIn.rowLine.dateFormat!==undefined){
            dateFormat=propsIn.rowLine.dateFormat;
        }

    }
    else if (fromElement==="2" && propsIn.rowLine!==undefined){
        if (propsIn.rowLine.name2!==undefined){
            name=propsIn.rowLine.name2;
        }
        if (propsIn.rowLine.ref2!==undefined){
            ref=propsIn.rowLine.ref2;
        }
        else{
            ref=dummyRef;
        }
        if (propsIn.rowLine.type2!==undefined){
            type=propsIn.rowLine.type2;
        }
        if (propsIn.rowLine.value2!==undefined){
            value=propsIn.rowLine.value2;
        }
        
        if (propsIn.rowLine.displayValue2!==undefined){
            displayValue=propsIn.rowLine.displayValue2;
        }
        else{
            displayValue=value;
        }
        
        if (propsIn.rowLine.label2!==undefined){
            label= propsIn.rowLine.label2;
        }

        if (propsIn.rowLine.id2!==undefined){
            id= propsIn.rowLine.id2;
        }
        
        if (propsIn.rowLine.lookupDataField2!==undefined){
            lookupDataField=propsIn.rowLine.lookupDataField2;
        }

        if (propsIn.rowLine.disableOn2!==undefined){
            disableOn= propsIn.rowLine.disableOn2;

        }

        if (propsIn.rowLine.disabled2!==undefined){
            disabled= propsIn.rowLine.disabled2;
        }

        if (propsIn.rowLine.readOnly2!==undefined){
            readOnly= propsIn.rowLine.readOnly2;
        }

        if (propsIn.rowLine.fieldClass2!==undefined){
            fieldClass= propsIn.rowLine.fieldClass2;
        }

        if (propsIn.rowLine.checkboxClass2!==undefined){
            checkboxClass= propsIn.rowLine.checkboxClass2;
        }

        if (propsIn.rowLine.checkboxLabelClass2!==undefined){
            checkboxLabelClass= propsIn.rowLine.checkboxLabelClass2;
        }
        
        if (propsIn.rowLine.checkboxLabelPos2!==undefined){
            checkboxLabelPos= propsIn.rowLine.checkboxLabelPos2.toUpperCase();;
        }

        if (propsIn.rowLine.placeholder2!==undefined){
            placeholder= propsIn.rowLine.placeholder2;
        }
        
        if (propsIn.rowLine.hoverMessage2!==undefined){
            hoverMessage= propsIn.rowLine.hoverMessage2;
        }
        
        if (propsIn.rowLine.step2!==undefined){
            step=propsIn.rowLine.step2;
        }
        
        if (propsIn.rowLine.buttonClass2!==undefined){
            buttonClass=propsIn.rowLine.buttonClass2;
        }
        
        if (propsIn.rowLine.iconClass2!==undefined){
            iconClass=propsIn.rowLine.iconClass2;
        }
        
        if (propsIn.rowLine.minDate2!==undefined){
            minDate=propsIn.rowLine.minDate2;
        }
        
        if (propsIn.rowLine.style2!==undefined){
            style=propsIn.rowLine.style2;
            
        }
       
        
        /* native for whoel screen can be over-ridden by field level settings */
        if (propsIn.rowLine.nativeDisplay2!==undefined){
            nativeDisplay=propsIn.rowLine.nativeDisplay2;
        }
        if (propsIn.rowLine.nativeStyle2!==undefined){
            nativeStyle=propsIn.rowLine.nativeStyle2;
        }
        
        if (propsIn.rowLine.searchable2!==undefined){
            isSearchable=propsIn.rowLine.searchable2;
        }
        if (propsIn.rowLine.icon2!==undefined){ 
            icon=propsIn.rowLine.icon2;
            useIcon=true;
        }
        if (propsIn.rowLine.iconColour2!==undefined){ 
            iconColour=propsIn.rowLine.iconColour2;
        }
        if (propsIn.rowLine.iconSize2!==undefined){ 
            iconSize=propsIn.rowLine.iconSize2;
        }
        if (propsIn.rowLine.iconFasFar2!==undefined){ 
            iconFasFar=propsIn.rowLine.iconFasFar2;
        }

        if (propsIn.rowLine.dateFormat2!==undefined){
            dateFormat=propsIn.rowLine.dateFormat2;
        }

    }
    
    /* FUNCTIONS START ********/
    if (propsIn.handleEditFormChange!==undefined){
        handleEditFormChange=propsIn.handleEditFormChange;
    }
    
    if (propsIn.handleonBlur!==undefined){
        handleonBlur=propsIn.handleonBlur;
    }
    
    if (propsIn.handleEditSelectChange!==undefined){
        handleEditSelectChange=propsIn.handleEditSelectChange;
    }

    if (propsIn.handleButtonClick!==undefined){
        handleButtonClick=propsIn.handleButtonClick;
    }
    
    if (propsIn.handleDatePick!==undefined){
        handleDatePick=propsIn.handleDatePick;
    }
    
    
    /* FUNCTIONS END ********/
    
    /* DATA START ****************/
    if (type==="dropdown" || type==="dropdownSingle" || type==="dropdownMulti"){
        ddData=lookupData[lookupDataField];
        
        
    }
    
       
    /* DATA END *****************/
    
    
    
    if (propsIn.modifyAction!==undefined){
        modifyAction= propsIn.modifyAction;
    }
    
    
    if (disabled){
        enableField=false;
    }
    else if (disableOn!=="" && modifyAction!==""){
        if (modifyAction==="ADD" && disableOn.includes("i")){
            enableField=false;
            
        }
        else if (modifyAction==="UPDATE" && disableOn.includes("u")){
            enableField=false;
            
        }
    }
    
    
    if (useIcon){
        buttonClass=iconClass;
    }
    
    
    
    let errorMessage="";
    if (propsIn.errorFields!==undefined && propsIn.errorFields.length>0){
        if (propsIn.errorFields[0][name]!==undefined){
            errorMessage=propsIn.errorFields[0][name];
        }
    }
    
    
    
     
    
    
    const dropdownStyle = {
    control: base => ({
      ...base,
      borderColor: "black",
      // This line disable the blue border
      boxShadow: "none",
//      minHeight: "28px",
//      height: "28px"
    })
  };
      
    
    if (debug){
        console.log("in FormField");
        console.log("type = " + type);
        console.log("name = " + name);
        console.log("value = " + value);
        console.log("hoverMessage = " + hoverMessage);
        console.log("id = " + id);
        console.log("checked = " + checked);
        console.log("enableField = " + enableField);
        console.log("disabled = " + disabled);
    }    
    
    let errorID=name+"_error_id";
    let outElement;
    
   
   if (enableField){
        if (debug){
            console.log("type = " + type);
        }
        if (type==="text"){
            outElement=
                        <Fragment>
                            <input 
                                type={type} 
                                name={name} 
                                ref={ref}
                                value={value}
                                className={fieldClass}
                                placeholder={placeholder}
                                title={hoverMessage}
                                style={style}
                                onChange={(event) => handleEditFormChange(event)}
                                onBlur={handleonBlur===undefined ? null : ((event) => handleonBlur(event))}
                                disabled={false}

                            />
                            <div>
                                <span id={errorID} className="text-error text-danger">{errorMessage}</span>
                            </div>    
                        </Fragment>;    
        }
        else if (type==="dropdownSingle"){
            let ddDataSingle=[];
            let valuexx=value;
            
            ddData.forEach((element, index, array) => {
                   
                   
                if (element.value === valuexx){
                    ddDataSingle.push(element);
                }

            });
            
            outElement=
                     <Fragment>
             
                        <Select
                            name={name}
                            ref={ref}
                            options={ddData}
                            styles={dropdownStyle}
                            value={ddDataSingle}
                            title={hoverMessage}
                            className="react-selectDD"
                            isDisabled={false}
                            isLoading={isLoading}
                            isClearable={isClearable}
                            isRtl={isRtl}
                            isSearchable={isSearchable}
                            onChange={(options,meta) => handleEditSelectChange(options,meta,'single')}
                            
                        />
                        <div>
                            <span id={errorID} className="text-error text-danger">{errorMessage}</span>
                        </div> 
                    </Fragment>;         
        }
        else if (type==="dropdownMulti"){
                
                let valueArray = value.split(",");
                let valueWithoutSpaces="";
                let comma ="";
                let ddDataMulti=[];
                /* value may have spaces so the following is used to remove the spaces ie could be "MS, UCR" it needs to be "MS,UCR" */
                for (let index = 0; index < valueArray.length; ++index) {
                    valueWithoutSpaces = valueWithoutSpaces + comma + valueArray[index].toLowerCase().trim();
                    comma=",";
                    
                }
                
                valueArray = valueWithoutSpaces.trim().split(",");
               
                ddData.forEach((element, index, array) => {
                   
                    if (valueArray.includes(element.value.toLowerCase())){
                        ddDataMulti.push(element);
                    }

                });
                
                
                
                outElement=
                     <Fragment>
             
                        <Select
                            
                            type={type} 
                            options={ddData}
                            name={name} 
                            ref={ref}
                            value={ddDataMulti}
                            title={hoverMessage}
                            onChange={(options,meta) => handleEditSelectChange(options,meta,'multi')}
                            isMulti
                        />
                        <div>
                            <span id={errorID} className="text-error text-danger">{errorMessage}</span>
                        </div>
                    </Fragment>;  
        } 
        else if (type==="dropdown"){
             outElement=
                     <Fragment>
                        <select name={name}
                                ref={ref}
                                value={value}
                                onChange={(event) => handleEditFormChange(event)}
                                title={hoverMessage}
                                disabled={false}
                                readOnly={readOnly}

                            > 


                            {ddData.map((ddDataElements) => <option  value={ddDataElements.value}>{ddDataElements.label}</option>)}
                        </select>
                        <div>
                            <span id={errorID} className="text-error text-danger">{errorMessage}</span>
                        </div>
                    </Fragment>;  
        }
        else if (type==="radio"){
            
            if (radioValue===value){
                checked=true;
            }
            
            if (debug){
                console.log("in radio");
                console.log("checked = " + checked);

            }  
        
            outElement=
            <Fragment>
           <input
                type="radio"
                name={name}
                ref={ref}
                value={value}
                id={id}
                checked={checked}
                style={style}
                title={hoverMessage}
                onChange={(event) => handleEditFormChange(event)}
              />
              <label htmlFor={id}>{label}</label>
              </Fragment>;  
        }
        else if (type==="checkbox"){
            checked = (parseInt(value)===1);
            
            if (checkboxLabelPos==="RIGHT"){
                checkboxLabelRIGHT=label;
            }
            else{
                checkboxLabelLEFT=label;
            }
            
               
            outElement=
                    <label className={checkboxLabelClass}>
                    {checkboxLabelLEFT}
                        
                        
                        <input
                          name={name}
                          ref={ref}
                          type={type} 
                          className={checkboxClass}
                          checked={checked}
                          onChange={(event) => handleEditFormChange(event)}
                          disabled={false}
                          readOnly={readOnly}
                          title={hoverMessage}


                        />
                        {checkboxLabelRIGHT}
                        
                        
                    </label> ;
        }
        else if (type==="integer" || type==="decimal"){
            const fieldtype="number";
            if (step===0){
                if (type==="integer"){
                    step=1;
                }
                else {
                    step=0.1;
                }
            }
            outElement=
                        <Fragment>
                            <input 
                                type={fieldtype} 
                                name={name}
                                ref={ref}
                                value={value}
                                step={step}
                                style={style}
                                title={hoverMessage}
                                onChange={(event) => handleEditFormChange(event)}
                                onBlur={handleonBlur===undefined ? null : ((event) => handleonBlur(event))}
                                disabled={false}

                            />
                            <div>
                                <span id={errorID} className="text-error text-danger">{errorMessage}</span>
                            </div>
                        </Fragment>;
        }
        else if (type==="button"){
            
            
                 outElement=<button ref={ref}
                                    name={name}
                                    style={style}
                                    title={value}
                                    
                                    className={buttonClass} 
                                    onClick={(event) => handleButtonClick(event,name)}>
                                            {useIcon ? (
                                                <FontAwesomeIcon icon={[iconFasFar, icon]} style={{ color: iconColour }} size={iconSize}/>    
                                            ) : value} 
                                            
                                        </button>
          
           
    
           
            
        }
        else if (type==="datePicker"){
            outElement= <div className="input-container">
                            <div>
                                <DatePicker
                                  selected={value}
                                  minDate={minDate}
                                  name={name}
                                  ref={ref}
                                  onChange={(date) => handleDatePick(name,date)}
                                  dateFormat={dateFormat}
                                  className="date_style"
                                  size="lg"
                                  
      
                                />
                            </div>
                            <div>
                            <span id={errorID} className="text-error text-danger">{errorMessage}</span>
                        </div>
                            
                        </div>;
        }
        
            
    }
    else{
        if (type==="checkbox"){
            
            checked = (parseInt(value)===1);
            
            if (checkboxLabelPos==="RIGHT"){
                checkboxLabelRIGHT=label;
            }
            else{
                checkboxLabelLEFT=label;
            }
            
               
            outElement=
                    <label className={checkboxLabelClass}>
                    {checkboxLabelLEFT}
                        
                        
                        <input
                          name={name}
                          ref={ref}
                          type={type} 
                          className={checkboxClass}
                          checked={checked}
                          onChange={(event) => handleEditFormChange(event)}
                          readOnly={readOnly}
                          title={hoverMessage}
                          disabled
                          

                        />
                        {checkboxLabelRIGHT}
                        
                        
                    </label> ;
        }
        else if (type==="button"){
            
            outElement=<button ref={ref}
                                    name={name}
                                    style={style}
                                    title={value}
                                    
                                    className={buttonClass}
                                    disabled
                                    >
                                            {useIcon ? (
                                                <FontAwesomeIcon icon={[iconFasFar, icon]} style={{ color: iconColour }} size={iconSize}/>    
                                            ) : value} 
                                            
                                        </button>
                                        
            /*                            
            outElement=
                    <input type="button" 
                           name={name} 
                           value={value} 
                           ref={ref} 
                           className={buttonClass}
                           onClick={(event) => handleButtonClick(event)}  disabled>
                        
                    </input>
                    */
        }
        else if (nativeDisplay){
            outElement=
                        <Fragment>
                            <input 
                                type="text"
                                name={name} 
                                ref={ref}
                                value={displayValue}
                                style={nativeStyle}
                                disabled={true}

                            />
                            <div>
                                <span id={errorID} className="text-error text-danger">{errorMessage}</span>
                            </div>
                             
                        </Fragment>;
        }
        else {
            outElement=displayValue;
        }    
    }
    
    
    
    return (
            outElement 
    );
    
  
};

export default TextField;
    
