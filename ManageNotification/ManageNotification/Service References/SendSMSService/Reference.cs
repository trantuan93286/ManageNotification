﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//     Runtime Version:4.0.30319.42000
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ManageNotification.SendSMSService {
    using System.Runtime.Serialization;
    using System;
    
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Runtime.Serialization", "4.0.0.0")]
    [System.Runtime.Serialization.DataContractAttribute(Name="ResponseDto", Namespace="http://schemas.datacontract.org/2004/07/NiisSmsGateway.Dto")]
    [System.SerializableAttribute()]
    public partial class ResponseDto : object, System.Runtime.Serialization.IExtensibleDataObject, System.ComponentModel.INotifyPropertyChanged {
        
        [System.NonSerializedAttribute()]
        private System.Runtime.Serialization.ExtensionDataObject extensionDataField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private long CodeField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private string MessageField;
        
        [global::System.ComponentModel.BrowsableAttribute(false)]
        public System.Runtime.Serialization.ExtensionDataObject ExtensionData {
            get {
                return this.extensionDataField;
            }
            set {
                this.extensionDataField = value;
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public long Code {
            get {
                return this.CodeField;
            }
            set {
                if ((this.CodeField.Equals(value) != true)) {
                    this.CodeField = value;
                    this.RaisePropertyChanged("Code");
                }
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public string Message {
            get {
                return this.MessageField;
            }
            set {
                if ((object.ReferenceEquals(this.MessageField, value) != true)) {
                    this.MessageField = value;
                    this.RaisePropertyChanged("Message");
                }
            }
        }
        
        public event System.ComponentModel.PropertyChangedEventHandler PropertyChanged;
        
        protected void RaisePropertyChanged(string propertyName) {
            System.ComponentModel.PropertyChangedEventHandler propertyChanged = this.PropertyChanged;
            if ((propertyChanged != null)) {
                propertyChanged(this, new System.ComponentModel.PropertyChangedEventArgs(propertyName));
            }
        }
    }
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    [System.ServiceModel.ServiceContractAttribute(ConfigurationName="SendSMSService.IBulkSmsService")]
    public interface IBulkSmsService {
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IBulkSmsService/Send", ReplyAction="http://tempuri.org/IBulkSmsService/SendResponse")]
        ManageNotification.SendSMSService.ResponseDto Send(string message, string phoneNumber, string userName, string passWord);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IBulkSmsService/Send", ReplyAction="http://tempuri.org/IBulkSmsService/SendResponse")]
        System.Threading.Tasks.Task<ManageNotification.SendSMSService.ResponseDto> SendAsync(string message, string phoneNumber, string userName, string passWord);
    }
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public interface IBulkSmsServiceChannel : ManageNotification.SendSMSService.IBulkSmsService, System.ServiceModel.IClientChannel {
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public partial class BulkSmsServiceClient : System.ServiceModel.ClientBase<ManageNotification.SendSMSService.IBulkSmsService>, ManageNotification.SendSMSService.IBulkSmsService {
        
        public BulkSmsServiceClient() {
        }
        
        public BulkSmsServiceClient(string endpointConfigurationName) : 
                base(endpointConfigurationName) {
        }
        
        public BulkSmsServiceClient(string endpointConfigurationName, string remoteAddress) : 
                base(endpointConfigurationName, remoteAddress) {
        }
        
        public BulkSmsServiceClient(string endpointConfigurationName, System.ServiceModel.EndpointAddress remoteAddress) : 
                base(endpointConfigurationName, remoteAddress) {
        }
        
        public BulkSmsServiceClient(System.ServiceModel.Channels.Binding binding, System.ServiceModel.EndpointAddress remoteAddress) : 
                base(binding, remoteAddress) {
        }
        
        public ManageNotification.SendSMSService.ResponseDto Send(string message, string phoneNumber, string userName, string passWord) {
            return base.Channel.Send(message, phoneNumber, userName, passWord);
        }
        
        public System.Threading.Tasks.Task<ManageNotification.SendSMSService.ResponseDto> SendAsync(string message, string phoneNumber, string userName, string passWord) {
            return base.Channel.SendAsync(message, phoneNumber, userName, passWord);
        }
    }
}
