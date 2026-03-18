k logs -n opensearch data-prepper-59bb9f9cc4-xftlg -f
Reading pipelines and data-prepper configuration files from Data Prepper home directory.
/usr/bin/java
Found openjdk version  of 17.0
2026-03-18T07:07:02,168 [main] INFO  org.opensearch.dataprepper.DataPrepperArgumentConfiguration - Command line args: /usr/share/data-prepper/pipelines,/usr/share/data-prepper/config/data-prepper-config.yaml
2026-03-18T07:07:02,335 [main] WARN  org.opensearch.dataprepper.pipeline.parser.rule.RuleEvaluator - Json Path not found for documentdb
2026-03-18T07:07:02,341 [main] WARN  org.opensearch.dataprepper.pipeline.parser.rule.RuleEvaluator - Json Path not found for documentdb
2026-03-18T07:07:02,342 [main] WARN  org.opensearch.dataprepper.pipeline.parser.rule.RuleEvaluator - Json Path not found for documentdb
2026-03-18T07:07:02,343 [main] INFO  org.opensearch.dataprepper.pipeline.parser.transformer.DynamicConfigTransformer - No transformation needed
2026-03-18T07:07:02,795 [main] INFO  org.opensearch.dataprepper.plugins.kafka.extension.KafkaClusterConfigExtension - Applying Kafka Cluster Config Extension.
2026-03-18T07:07:03,065 [main] INFO  org.opensearch.dataprepper.parser.PipelineTransformer - Building pipeline [entry-pipeline] from provided configuration
2026-03-18T07:07:03,065 [main] INFO  org.opensearch.dataprepper.parser.PipelineTransformer - Building [otel_trace_source] as source component for the pipeline [entry-pipeline]
2026-03-18T07:07:03,125 [main] ERROR org.opensearch.dataprepper.parser.PipelineTransformer - Construction of pipeline components failed, skipping building of pipeline [entry-pipeline] and its connected pipelines
java.lang.IllegalArgumentException: Unrecognized field "http" (class org.opensearch.dataprepper.plugins.source.oteltrace.OTelTraceSourceConfig), not marked as ignorable (21 known properties: "port", "acmPrivateKeyPassword", "path", "sslKeyCertChainFile", "ssl_cert_and_key_file_in_s3", "max_connection_count", "useAcmCertForSSL", "ssl", "unauthenticated_health_check", "sslKeyFile", "request_timeout", "unframed_requests", "proto_reflection_service", "thread_count", "health_check_service", "acmCertIssueTimeOutMillis", "compression", "acmCertificateArn", "authentication", "awsRegion", "max_request_length"])
 at [Source: UNKNOWN; byte offset: #UNKNOWN] (through reference chain: org.opensearch.dataprepper.plugins.source.oteltrace.OTelTraceSourceConfig["http"])
        at com.fasterxml.jackson.databind.ObjectMapper._convert(ObjectMapper.java:4624) ~[jackson-databind-2.17.0.jar:2.17.0]
        at com.fasterxml.jackson.databind.ObjectMapper.convertValue(ObjectMapper.java:4555) ~[jackson-databind-2.17.0.jar:2.17.0]
        at org.opensearch.dataprepper.plugin.PluginConfigurationConverter.convertSettings(PluginConfigurationConverter.java:83) ~[data-prepper-plugin-framework-2.8.0.jar:?]
        at org.opensearch.dataprepper.plugin.PluginConfigurationConverter.convert(PluginConfigurationConverter.java:62) ~[data-prepper-plugin-framework-2.8.0.jar:?]
        at org.opensearch.dataprepper.plugin.DefaultPluginFactory.getConstructionContext(DefaultPluginFactory.java:114) ~[data-prepper-plugin-framework-2.8.0.jar:?]
        at org.opensearch.dataprepper.plugin.DefaultPluginFactory.loadPlugin(DefaultPluginFactory.java:73) ~[data-prepper-plugin-framework-2.8.0.jar:?]
        at org.opensearch.dataprepper.parser.PipelineTransformer.lambda$buildPipelineFromConfiguration$2(PipelineTransformer.java:116) ~[data-prepper-core-2.8.0.jar:?]
        at java.base/java.util.Optional.orElseGet(Optional.java:364) ~[?:?]
        at org.opensearch.dataprepper.parser.PipelineTransformer.buildPipelineFromConfiguration(PipelineTransformer.java:115) ~[data-prepper-core-2.8.0.jar:?]
        at org.opensearch.dataprepper.parser.PipelineTransformer.transformConfiguration(PipelineTransformer.java:99) ~[data-prepper-core-2.8.0.jar:?]
        at org.opensearch.dataprepper.DataPrepper.<init>(DataPrepper.java:69) ~[data-prepper-core-2.8.0.jar:2.8.0]
        at java.base/jdk.internal.reflect.NativeConstructorAccessorImpl.newInstance0(Native Method) ~[?:?]
        at java.base/jdk.internal.reflect.NativeConstructorAccessorImpl.newInstance(NativeConstructorAccessorImpl.java:77) ~[?:?]
        at java.base/jdk.internal.reflect.DelegatingConstructorAccessorImpl.newInstance(DelegatingConstructorAccessorImpl.java:45) ~[?:?]
        at java.base/java.lang.reflect.Constructor.newInstanceWithCaller(Constructor.java:499) ~[?:?]
        at java.base/java.lang.reflect.Constructor.newInstance(Constructor.java:480) ~[?:?]
        at org.springframework.beans.BeanUtils.instantiateClass(BeanUtils.java:211) ~[spring-beans-5.3.28.jar:5.3.28]
        at org.springframework.beans.factory.support.SimpleInstantiationStrategy.instantiate(SimpleInstantiationStrategy.java:117) ~[spring-beans-5.3.28.jar:5.3.28]
        at org.springframework.beans.factory.support.ConstructorResolver.instantiate(ConstructorResolver.java:311) ~[spring-beans-5.3.28.jar:5.3.28]
        at org.springframework.beans.factory.support.ConstructorResolver.autowireConstructor(ConstructorResolver.java:296) ~[spring-beans-5.3.28.jar:5.3.28]
        at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.autowireConstructor(AbstractAutowireCapableBeanFactory.java:1372) ~[spring-beans-5.3.28.jar:5.3.28]
        at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.createBeanInstance(AbstractAutowireCapableBeanFactory.java:1222) ~[spring-beans-5.3.28.jar:5.3.28]
        at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.doCreateBean(AbstractAutowireCapableBeanFactory.java:582) ~[spring-beans-5.3.28.jar:5.3.28]
        at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.createBean(AbstractAutowireCapableBeanFactory.java:542) ~[spring-beans-5.3.28.jar:5.3.28]
        at org.springframework.beans.factory.support.AbstractBeanFactory.lambda$doGetBean$0(AbstractBeanFactory.java:335) ~[spring-beans-5.3.28.jar:5.3.28]
        at org.springframework.beans.factory.support.DefaultSingletonBeanRegistry.getSingleton(DefaultSingletonBeanRegistry.java:234) [spring-beans-5.3.28.jar:5.3.28]
        at org.springframework.beans.factory.support.AbstractBeanFactory.doGetBean(AbstractBeanFactory.java:333) [spring-beans-5.3.28.jar:5.3.28]
        at org.springframework.beans.factory.support.AbstractBeanFactory.getBean(AbstractBeanFactory.java:208) [spring-beans-5.3.28.jar:5.3.28]
        at org.springframework.beans.factory.support.DefaultListableBeanFactory.preInstantiateSingletons(DefaultListableBeanFactory.java:955) [spring-beans-5.3.28.jar:5.3.28]
        at org.springframework.context.support.AbstractApplicationContext.finishBeanFactoryInitialization(AbstractApplicationContext.java:920) [spring-context-5.3.28.jar:5.3.28]
        at org.springframework.context.support.AbstractApplicationContext.refresh(AbstractApplicationContext.java:583) [spring-context-5.3.28.jar:5.3.28]
        at org.opensearch.dataprepper.AbstractContextManager.start(AbstractContextManager.java:59) [data-prepper-core-2.8.0.jar:2.8.0]
        at org.opensearch.dataprepper.AbstractContextManager.getDataPrepperBean(AbstractContextManager.java:45) [data-prepper-core-2.8.0.jar:2.8.0]
        at org.opensearch.dataprepper.DataPrepperExecute.main(DataPrepperExecute.java:39) [data-prepper-main-2.8.0.jar:2.8.0]
Caused by: com.fasterxml.jackson.databind.exc.UnrecognizedPropertyException: Unrecognized field "http" (class org.opensearch.dataprepper.plugins.source.oteltrace.OTelTraceSourceConfig), not marked as ignorable (21 known properties: "port", "acmPrivateKeyPassword", "path", "sslKeyCertChainFile", "ssl_cert_and_key_file_in_s3", "max_connection_count", "useAcmCertForSSL", "ssl", "unauthenticated_health_check", "sslKeyFile", "request_timeout", "unframed_requests", "proto_reflection_service", "thread_count", "health_check_service", "acmCertIssueTimeOutMillis", "compression", "acmCertificateArn", "authentication", "awsRegion", "max_request_length"])
 at [Source: UNKNOWN; byte offset: #UNKNOWN] (through reference chain: org.opensearch.dataprepper.plugins.source.oteltrace.OTelTraceSourceConfig["http"])
        at com.fasterxml.jackson.databind.exc.UnrecognizedPropertyException.from(UnrecognizedPropertyException.java:61) ~[jackson-databind-2.17.0.jar:2.17.0]
        at com.fasterxml.jackson.databind.DeserializationContext.handleUnknownProperty(DeserializationContext.java:1153) ~[jackson-databind-2.17.0.jar:2.17.0]
        at com.fasterxml.jackson.databind.deser.std.StdDeserializer.handleUnknownProperty(StdDeserializer.java:2241) ~[jackson-databind-2.17.0.jar:2.17.0]
        at com.fasterxml.jackson.databind.deser.BeanDeserializerBase.handleUnknownProperty(BeanDeserializerBase.java:1793) ~[jackson-databind-2.17.0.jar:2.17.0]
        at com.fasterxml.jackson.databind.deser.BeanDeserializerBase.handleUnknownVanilla(BeanDeserializerBase.java:1771) ~[jackson-databind-2.17.0.jar:2.17.0]
        at com.fasterxml.jackson.databind.deser.BeanDeserializer.vanillaDeserialize(BeanDeserializer.java:316) ~[jackson-databind-2.17.0.jar:2.17.0]
        at com.fasterxml.jackson.databind.deser.BeanDeserializer.deserialize(BeanDeserializer.java:177) ~[jackson-databind-2.17.0.jar:2.17.0]
        at com.fasterxml.jackson.databind.ObjectMapper._convert(ObjectMapper.java:4619) ~[jackson-databind-2.17.0.jar:2.17.0]
        ... 33 more
2026-03-18T07:07:03,136 [main] WARN  org.springframework.context.support.AbstractApplicationContext - Exception encountered during context initialization - cancelling refresh attempt: org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'dataPrepper' defined in URL [jar:file:/usr/share/data-prepper/lib/data-prepper-core-2.8.0.jar!/org/opensearch/dataprepper/DataPrepper.class]: Bean instantiation via constructor failed; nested exception is org.springframework.beans.BeanInstantiationException: Failed to instantiate [org.opensearch.dataprepper.DataPrepper]: Constructor threw exception; nested exception is java.lang.RuntimeException: No valid pipeline is available for execution, exiting
Exception in thread "main" org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'dataPrepper' defined in URL [jar:file:/usr/share/data-prepper/lib/data-prepper-core-2.8.0.jar!/org/opensearch/dataprepper/DataPrepper.class]: Bean instantiation via constructor failed; nested exception is org.springframework.beans.BeanInstantiationException: Failed to instantiate [org.opensearch.dataprepper.DataPrepper]: Constructor threw exception; nested exception is java.lang.RuntimeException: No valid pipeline is available for execution, exiting
        at org.springframework.beans.factory.support.ConstructorResolver.instantiate(ConstructorResolver.java:315)
        at org.springframework.beans.factory.support.ConstructorResolver.autowireConstructor(ConstructorResolver.java:296)
        at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.autowireConstructor(AbstractAutowireCapableBeanFactory.java:1372)
        at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.createBeanInstance(AbstractAutowireCapableBeanFactory.java:1222)
        at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.doCreateBean(AbstractAutowireCapableBeanFactory.java:582)
        at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.createBean(AbstractAutowireCapableBeanFactory.java:542)
        at org.springframework.beans.factory.support.AbstractBeanFactory.lambda$doGetBean$0(AbstractBeanFactory.java:335)
        at org.springframework.beans.factory.support.DefaultSingletonBeanRegistry.getSingleton(DefaultSingletonBeanRegistry.java:234)
        at org.springframework.beans.factory.support.AbstractBeanFactory.doGetBean(AbstractBeanFactory.java:333)
        at org.springframework.beans.factory.support.AbstractBeanFactory.getBean(AbstractBeanFactory.java:208)
        at org.springframework.beans.factory.support.DefaultListableBeanFactory.preInstantiateSingletons(DefaultListableBeanFactory.java:955)
        at org.springframework.context.support.AbstractApplicationContext.finishBeanFactoryInitialization(AbstractApplicationContext.java:920)
        at org.springframework.context.support.AbstractApplicationContext.refresh(AbstractApplicationContext.java:583)
        at org.opensearch.dataprepper.AbstractContextManager.start(AbstractContextManager.java:59)
        at org.opensearch.dataprepper.AbstractContextManager.getDataPrepperBean(AbstractContextManager.java:45)
        at org.opensearch.dataprepper.DataPrepperExecute.main(DataPrepperExecute.java:39)
Caused by: org.springframework.beans.BeanInstantiationException: Failed to instantiate [org.opensearch.dataprepper.DataPrepper]: Constructor threw exception; nested exception is java.lang.RuntimeException: No valid pipeline is available for execution, exiting
        at org.springframework.beans.BeanUtils.instantiateClass(BeanUtils.java:224)
        at org.springframework.beans.factory.support.SimpleInstantiationStrategy.instantiate(SimpleInstantiationStrategy.java:117)
        at org.springframework.beans.factory.support.ConstructorResolver.instantiate(ConstructorResolver.java:311)
        ... 15 more
Caused by: java.lang.RuntimeException: No valid pipeline is available for execution, exiting
        at org.opensearch.dataprepper.DataPrepper.<init>(DataPrepper.java:72)
        at java.base/jdk.internal.reflect.NativeConstructorAccessorImpl.newInstance0(Native Method)
        at java.base/jdk.internal.reflect.NativeConstructorAccessorImpl.newInstance(NativeConstructorAccessorImpl.java:77)
        at java.base/jdk.internal.reflect.DelegatingConstructorAccessorImpl.newInstance(DelegatingConstructorAccessorImpl.java:45)
        at java.base/java.lang.reflect.Constructor.newInstanceWithCaller(Constructor.java:499)
        at java.base/java.lang.reflect.Constructor.newInstance(Constructor.java:480)
        at org.springframework.beans.BeanUtils.instantiateClass(BeanUtils.java:211)
        ... 17 more
